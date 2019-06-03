const spicedPg = require("spiced-pg");
const dburl = process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/petition"
var db = spicedPg(dburl);

////////////7////////store functions/////////////////////////////////

module.exports.storeInUsers = function(
	first,
	last,
	email,
	password
) {
	return db.query(
		`INSERT INTO users (first,last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
		[first || null, last || null, email || null, password || null]
	);
};

////////////////////////////get functions////////////////////////////


module.exports.getUserDataById = function(Id) {
	return db.query(
		`SELECT * FROM users WHERE id = $1`,
		[id]
	);
};

module.exports.getUserDataByEmail = function(email) {
	return db.query(
		`SELECT * FROM users WHERE email = $1`,
		[email]
	);
};
