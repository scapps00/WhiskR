// http://passportjs.org/docs/authenticate

const express = require("express");
const connect = require("connect");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require('passport-local').Strategy;


const RandomPet = require("./models/randomizer.js");
const SavedPets = require("./models/SavedPets.js");
const User = require("./models/user.js");//JM added this 7/29
mongoose.Promise = Promise;

mongoose.connect("mongodb://heroku_vmqqgqz9:lp2s75apukle8jkb3oir04g6s9@ds161262.mlab.com:61262/heroku_vmqqgqz9");
var db = mongoose.connection;

db.on("error", function(error) {
	console.log("Mongoose Error: " + error);
});

db.once("open", function() {
	console.log("Mongoose connection successful.");
});

const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var id = "";

app.get("/", function(req, res) {
	res.sendFile("index.html");
});

app.post("/login", function(req, res, next) {
	console.log("hey");
	let username = req.body.username;
	let password = req.body.password;
	passport.authenticate("local", function(error, user, info) {
		console.log(user);
		if (!user) {
			console.log("what");
			User.register(new User({username: username}), password, function(error) {
				if (error) console.log(error);
				else {
					res.send("YOU REGISTERED!");
				}
			});
		} else {
			id = user._id;
			res.sendFile("/test.html");
		}
	})(req, res, next);
});

// app.get("/user/:id", function(req, res) {
// 	res.sendFile(path.join(__dirname, "/public/test.html"));
// });

// app.get("/auth", function(req, res) {
// 	res.send("/auth.html");
    // app.route("/user").post(users.create);
// 		// app.route("/user").post(users.create);
// });

// app.post('/users',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });

// 	// module.exports = function() {
// 	    passport.use(new LocalStrategy(function(email, password, done) {
// 	        User.findOne(
// 	            {email: email},
// 	            function(err, user) {
// 	                if (err) {
// 	                    return done(err);
// 	                }

// 	                if (!user) {
// 	                    return done(null, false, {message: 'Unknown user'});
// 	                }

// 	                if (!user.authenticate(password)) {
// 	                    return done(null, false, {message: 'Invalid password'});
// 	                }

// 	                return done(null, user);
// 	            }
// 	        );
// 	    }));
// 	// };


app.get("/test", function(req, res) {

	res.send("/test.html");
});

app.post("/remove", function(req, res) {
	RandomPet.remove({}).exec(function(error) {
		if (error) console.log(error);
		res.send("deleted!");
	});
});

app.get("/getSavedPets", function(req, res) {
	SavedPets.find({ userId: id }).exec(function(error, results) {
		if (error) console.log(error);
		res.send(results);
	});
});

app.post("/likePet", function(req, res) {
	let newRandomPet = new RandomPet(req.body);
	newRandomPet.save(function(error, newPet) {
		if (error) console.log(error);
		else res.send("SAVED!");
	});
});

app.post("/deletePet/:name", function(req, res) {
	SavedPets.remove({ "name": req.params.name, "userId": id }).exec(function(error) {
		if (error) console.log(error);
		else {
			res.send("DELETED!");
		}
	});
});

app.post("/savePet", function(req, res) {
	req.body.data.userId = id;
	let newSavedPet = new SavedPets(req.body.data);
	newSavedPet.save(function(error, newPet) {
		if (error) console.log(error);
		else res.send("SAVED!");
	});
});

app.get("/getLikedPets", function(req, res) {
	RandomPet.find({}).exec(function(error, results) {
		if (error) console.log(error);
		res.send(results);
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log("App listening on PORT 3000");
});
