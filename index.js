const express = require("express");
const app = express();
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
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

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
                friendshipStatus = { friendshipStatus: "Add Friend" };
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
            console.log("friendship status: ", friendshipStatus);
            res.json(friendshipStatus);
        } catch (err) {
            console.log("GET FRIENDSHIP STATUS ERROR: ", err);
        }
    }
});
///////////////////////  POST change-friendship-status  ////////////////////////
app.post("/change-friendship-status", async (req, res) => {
    console.log("*******change-friendship-status*******");

    const userId = req.session.userId;
    const otherUserId = req.body.receiverId;
    const action = req.body.action;

    console.log(
        "userId: ",
        userId,
        "action: ",
        action,
        " otherUserId: ",
        otherUserId
    );

    try {
        switch (action) {
            case "Add Friend":
                const addFriend = await db.sendFriendRequest(
                    userId,
                    otherUserId
                );
                console.log("friend request sent: ");
                res.json("Cancel Request");
                break;
            case "Cancel Request":
                const cancelRequest = await db.deleteFriendRequest(
                    userId,
                    otherUserId
                );
                console.log("delete request", cancelRequest);

                res.json("Add Friend");
                break;
            case "Unfriend":
                const unfriend = await db.deleteFriendRequest(
                    userId,
                    otherUserId
                );
                console.log("Unfriend", unfriend);

                res.json("Add Friend");
                break;
            case "Accept":
                const acceptRequest = await db.acceptFriendRequest(
                    userId,
                    otherUserId
                );
                console.log("friend request accepted", acceptRequest);
                res.json("Unfriend");

                break;
            default:
                console.log("hmm, Iguess something went wrong...");
        }
    } catch (err) {
        console.log("/change-friendship-status error", err);
    }
});
////////////////////////////FIND USERS//////////////////////////

app.post("/find-users", (req, res) => {
    console.log("*******GET /USERS*******");
    db.findUsers(req.body.find)
        .then(results => {
            console.log("found in db: ", results.rows);

            res.json({
                users: results.rows
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

////////////////////////////////////////////////////////////////////////////////
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
