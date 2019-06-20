const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

const compression = require("compression");
const db = require("./utils/db");
const csurf = require("csurf");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bc = require("./utils/bc");

const multer = require(`multer`);
const uidSafe = require(`uid-safe`);
const path = require(`path`);
const s3 = require("./s3");
const amazonUrl = require(`./config`).s3Url;
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(compression());

////////////////////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

///////////////////////////////////APP USE////////////////////////////////////////
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    console.log("io is working");
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
///////////////handle Vulnerabilities//////////////

app.use(csurf()); //place right after bodyParser and cookieSession///

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static("./public"));

///////////////////////////////// APP GET///////////////////////////////////////

app.get("/", (req, res, next) => {
    if (!req.session.userId) {
        console.log("redirect to welcome");
        res.redirect("/welcome");
    } else {
        next();
    }
});

/////////////////////// GET USER//////////////////
app.get("/user", (req, res) => {
    console.log("*******GET /USER*******");
    //console.log("get user: ", req.session);

    if (!req.session.userId) {
        console.log("redirect to welcome");
        res.redirect("/welcome");
    } else {
        db.getUserDataById(req.session.userId)
            .then(results => {
                const userData = results.rows[0];
                console.log("got user data: ", userData);
                res.json({
                    id: userData.id,
                    first: userData.first,
                    last: userData.last,
                    bio: userData.bio,
                    imageUrl: userData.imgurl,
                    coverImgUrl: userData.coverimgurl,
                    success: true
                });
            })
            .catch(err => {
                console.log("GET USER DATA", err);
            });
    }
});

///////////////////////GET OTHER USER/////////////////////

app.get("/otheruser/:id", async (req, res) => {
    console.log("*******GET OTHER USER DATA*******");
    const otherUserId = req.params.id;
    const userId = req.session.userId;
    if (otherUserId == req.session.userId) {
        res.json({ success: false });
    } else {
        try {
            let userData = await db.getUserDataById(otherUserId);
            let friendshipStatus = await db.getFriendshipStatus(
                userId,
                otherUserId
            );
            //console.log("friendshipStatus: ", friendshipStatus);
            let noRequest = friendshipStatus.rowCount == 0;

            if (noRequest) {
                friendshipStatus = { friendshipStatus: "Add Friend" };
            } else {
                let accepted = friendshipStatus.rows[0].accepted;
                const receiverId = friendshipStatus.rows[0].receiver_id;
                console.log("request status: ", accepted);
                console.log("receiverId: ", receiverId);

                switch (accepted) {
                    case true:
                        friendshipStatus = {
                            friendshipStatus: "Unfriend"
                        };
                        break;
                    case false:
                        if (receiverId == otherUserId) {
                            friendshipStatus = {
                                friendshipStatus: "Cancel Request"
                            };
                        } else {
                            friendshipStatus = {
                                friendshipStatus: "Accept"
                            };
                        }

                        break;
                    default:
                        friendshipStatus = { friendshipStatus: "shit!" };
                }
            }

            const merged = { ...userData.rows[0] };
            console.log("user data + friendship status: ", merged);

            res.json(merged);
        } catch (err) {
            console.log("GET OTHER USER DATA ERROR: ", err);
        }
    }
});
///////////////////////GET FRIENDSHIP STATUS/////////////////////

app.get("/friendship-status/:id", async (req, res) => {
    console.log("*******GET FRIENDSHIP STATUS*******");

    const otherUserId = req.params.id;
    const userId = req.session.userId;

    if (otherUserId != userId) {
        try {
            let friendshipStatus = await db.getFriendshipStatus(
                userId,
                otherUserId
            );
            let noRequest = friendshipStatus.rowCount == 0;

            if (noRequest) {
                friendshipStatus = {
                    friendshipStatus: "Add Friend",
                    buttonText: "Add Friend"
                };
            } else {
                let accepted = friendshipStatus.rows[0].accepted;
                const receiverId = friendshipStatus.rows[0].receiver_id;
                console.log("request status: ", accepted);
                console.log("receiverId: ", receiverId);

                switch (accepted) {
                    case true:
                        friendshipStatus = {
                            friendshipStatus: "Unfriend",
                            buttonText: "Friend"
                        };
                        break;
                    case false:
                        if (receiverId == otherUserId) {
                            friendshipStatus = {
                                friendshipStatus: "Cancel Request",
                                buttonText: "Cancel Request"
                            };
                        } else {
                            friendshipStatus = {
                                friendshipStatus: "Accept",
                                buttonText: "Accept"
                            };
                        }
                        break;
                    default:
                        friendshipStatus = { friendshipStatus: "shit!" };
                }
            }
            console.log("friendship status: ", friendshipStatus);
            res.json(friendshipStatus);
        } catch (err) {
            console.log("GET FRIENDSHIP STATUS ERROR: ", err);
        }
    }
});

////////////////////////////FIND USERS//////////////////////////

app.post("/find-users", (req, res) => {
    console.log("*******GET /USERS*******");
    db.findUsers(req.body.find)
        .then(results => {
            let users = results.rows.filter(
                user => user.id != req.session.userId
            );

            res.json({
                users: users
            });
        })
        .catch(err => {
            console.log("FIND PEOPLE ERROR", err);
        });
});

/////////////////////////////////////Post//////////////////////////////////////

app.post("/register", (req, res) => {
    console.log("*******POST REGISTER*******");
    console.log(req.body.email);
    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;
    const password = req.body.password;

    if (!first) {
        res.json({
            error: "missing fields..."
        });
        return;
    }
    bc.hashPassword(password)
        .then(hashedPass => {
            return db.storeInUsers(first, last, email, hashedPass);
        })
        .then(results => {
            const user = results.rows[0];
            console.log("user ID: ", user.id);
            req.session.userId = user.id;

            res.json({
                success: true,
                userId: user.id
            });
        })
        .catch(e => {
            res.json({
                success: false,
                error: "something is wrong. please try again"
            });
            console.log("POST REGISTER ERROR: ", e);
        });
});

app.post("/login", (req, res) => {
    console.log("*******POST LOGIN*******");
    console.log("req.body", req.body);

    if (!req.body.email) {
        res.json({
            error: "missing fields..."
        });
    }
    db.getUserDataByEmail(req.body.email)
        .then(results => {
            console.log("password from table:", results.rows[0].password);
            console.log("password from form: ", req.body.password);
            const user = results.rows[0];
            console.log("get user data by id ", user);
            bc.checkPassword(req.body.password, user.password)
                .then(validPassword => {
                    if (validPassword) {
                        console.log("*******correct password******");

                        req.session.userId = user.id;
                        res.json({
                            success: true,
                            userId: user.id
                        });
                    }
                })
                .then(results => {
                    console.log("req.session  = ", req.session);
                });
        })
        .catch(err => {
            console.log("error", err);
            res.json({
                error: "wrong email or passsword!"
            });
        });
});
//////////////////////////////////Logout////////////////////////////////////////

app.get("/logout", (req, res) => {
    console.log("*******LOG OUT*******");
    req.session = null;
    res.redirect("/welcome");
});
//////////////////////////////////POST Uploader777777777777777777777777777777///

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    console.log(req.body);
    // If nothing went wrong the file is already in the uploads directory
    // req.file will refer to the image that was just uploaded
    console.log("req.file: ", req.file);
    // So what we want to store in the images table is the amazonaws URL + the filename.
    var url = `${amazonUrl}${req.file.filename}`;

    if (req.file) {
        let userId = req.session.userId;
        db.uploadImg(userId, url)
            .then(results => {
                console.log(results);
                console.log("uploaded successfuly. image url: ", url);
                res.json({
                    imageUrl: url,
                    success: true
                });
            })
            .catch(e => {
                console.log("error at /uplaod", e);
            });
    } else {
        res.json({
            success: false
        });
    }
});
app.post("/upload-cover", uploader.single("file"), s3.upload, function(
    req,
    res
) {
    console.log(req.body);
    console.log("req.file: ", req.file);
    var url = `${amazonUrl}${req.file.filename}`;

    if (req.file) {
        let userId = req.session.userId;

        db.uploadCoverImg(userId, url)
            .then(results => {
                console.log(results);
                console.log("uploaded successfuly. image url: ", url);
                res.json({
                    imageUrl: url,
                    success: true
                });
            })
            .catch(e => {
                console.log("error at /uplaod", e);
            });
    } else {
        res.json({
            success: false
        });
    }
});

////////////////////////////////// EDIT BIO ////////////////////////////////////////

app.post("/edit-bio", (req, res) => {
    console.log("*******edit bio*****");
    console.log(req.body);

    if (req.body.bio) {
        let bio = req.body.bio;
        let userId = req.session.userId;
        db.updateBio(userId, bio)
            .then(results => {
                console.log(results);
                res.json(results.rows[0]);
            })
            .catch(e => {
                console.log("error at /uplaod", e);
            });
    } else {
        res.json({
            success: false
        });
    }
});

/////////////////////////////////// get friends of friends //////////////////////
app.get("/get-friends/:id", async (req, res) => {
    console.log("**********  GET FRIENDS  ************");
    const userId = req.params.id;
    console.log("userId", userId);
    try {
        const friends = await db.getfriends(userId);
        console.log("found", friends.rows.length, "friends: ", friends.rows);

        res.json(friends.rows);
    } catch (err) {
        console.log("get-friends", err);
    }
});
/////////////////////////////////// get friends //////////////////////
app.get("/get-friends", async (req, res) => {
    console.log("**********  GET FRIENDS  ************");
    const userId = req.session.userId;
    console.log("userId", userId);
    try {
        const friends = await db.getfriends(userId);
        console.log("found", friends.rows.length, "friends: ", friends.rows);

        res.json(friends.rows);
    } catch (err) {
        console.log("get-friends", err);
    }
});
/////////////////////////////////// post friends //////////////////////

app.post("/add-friend", async (req, res) => {
    const userId = req.session.userId;
    const otherUserId = req.body.otherUserId;

    try {
        const addFriend = await db.sendFriendRequest(userId, otherUserId);
        console.log("friend request sent", addFriend);
        res.json("Cancel Request");
    } catch (err) {
        console.log("/add-friend error", err);
    }
});
app.post("/accept-friendship", async (req, res) => {
    const userId = req.session.userId;
    const otherUserId = req.body.otherUserId;

    try {
        const acceptRequest = await db.acceptFriendRequest(userId, otherUserId);
        console.log("friend request accepted", acceptRequest);
        res.json("Unfriend");
    } catch (err) {
        console.log("/accept-friendship", err);
    }
});

app.post("/end-friendship", async (req, res) => {
    const userId = req.session.userId;
    const otherUserId = req.body.otherUserId;

    try {
        const unfriend = await db.deleteFriendRequest(userId, otherUserId);
        console.log("Unfriend", unfriend);

        res.json("Add Friend");
    } catch (err) {
        console.log("/end-friendship error: "), err;
    }
});
//////////////////////////////////////////////////////////////////////////////
app.post("/forced-friendship", async (req, res) => {
    console.log("**********  FORCED FRIEND  ************");
    const userId = req.session.userId;
    const otherUserId = req.body.id;

    try {
        const force = await db.forceToBeFriends(userId, otherUserId, true);
        console.log("forced friendship", force);
        res.json("Unfriend");
    } catch (err) {
        console.log("/forced-friendship", err);
    }
});
app.post("/forced-request", async (req, res) => {
    console.log("**********  FORCED REQUEST  ************");
    const userId = req.session.userId;
    const otherUserId = req.body.id;
    try {
        const force = await db.forceRequest(otherUserId, userId);
        console.log("Force Request: ", force);
        res.json("Accept");
    } catch (err) {
        console.log("/forced-request: ", err);
    }
});
////////////////////////////////////////////////////////////////////////////////
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(8080, function() {
    console.log("I'm listening.");
});
///////////////////////////////SOCKET IO ///////////////////////////////////////

io.on("connection", async function(socket) {
    console.log("user trying to connect");

    try {
        if (!socket.request.session.userId) {
            console.log(`Socket is disconnected`);
            return socket.disconnect(true);
        }
        const userId = socket.request.session.userId;
        const getMessages = await db.getMessages();
        const gangChat = getMessages.rows.filter(
            msg => msg.receiver_id == null
        );

        let privateMessages = getMessages.rows.filter(
            msg => msg.sender_id == userId || msg.receiver_id == userId
        );

        //console.log("messages in db: ", gangChat.length);
        //console.log("privateMessages in db: ", privateMessages);

        console.log(`user ${userId}, socket id ${socket.id} is connected`);
        socket.emit("getMessages", gangChat);
        socket.emit("getPrivateMessages", privateMessages);

        socket.on("newMessage", async function(message) {
            //console.log("message text", message.text);
            console.log("message receiver id ", message.receiverId);

            let newMessage = await db.storeMessages(
                message.text,
                userId,
                message.receiverId
            );
            //    console.log("newMessage", newMessage.rows[0].id);
            newMessage = await db.getNewMessage(newMessage.rows[0].id);

            io.sockets.emit("newMessage", newMessage.rows[0]);
        });

        socket.on("disconnect", function() {
            console.log(
                `user ${userId}, socket id ${socket.id} is disconnected`
            );
        });
    } catch (err) {
        console.log("socket.io error: ", err);
        return socket.disconnect(true);
    }
});
