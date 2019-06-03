const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const csurf = require("csurf");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(compression());

////////////////////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
};

////////////////////////////////////////////////////////////////////////////////
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

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});



app.use(express.static('./public'));

////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
	res.redirect("/welcome")
});



/////////////////////////////////////Post//////////////////////////////////////


app.post("/register", (req, res) => {
	console.log(req.body);
	bc.hashPassword(req.body.password)
		.then(hashedPass => {
			return db.storeInUsers(
				req.body.first,
				req.body.last,
				req.body.email,
				hashedPass
			);
		})
		.then(results => {
			const user = results.rows[0];
			console.log("results: ", results);
			req.session.userId = user.id;
			res.redirect("/profile");
		})
		.catch(e => {
			console.log(e);
		});
});


////////////////////////////////////////////////////////////////////////////////
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
