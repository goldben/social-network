const express = require('express');
const app = express();
const compression = require('compression');

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

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



app.get('/', (req, res) => {
	res.redirect('/welcome')
});





app.get('*', function(req, res) {
	// lsat rout. anything beyond * is unreachble
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
