// Team If you segregate this, you can fork and then creqte your own db and deployment on Heroku if you want.

var mongoose = require("mongoose");
// You need this: https://hackhands.com/mongodb-crud-mvc-way-with-passport-authentication/
require('../models/users.js');

// // See docs for Using `mongoose.connect`...
// var promise = mongoose.connect('mongodb://localhost/myapp', {
//   useMongoClient: true,

module.exports = mongoose.connect(process.env.MONGODB_URI || ("mogodb://heroku_ww9dbxjw:bq6umoritesqhk01na8jqc63m4@ds161742.mlab.com:61742/heroku_ww9dbxjwmongodb://heroku_q704sxx4:ifgiglkhn5je05sm3v3nt3othn@ds157342.mlab.com:57342/heroku_q704sxx4"), {useMongoClient: true});



// Note to self: (JM)

//JM's Heroku app info:
//aqueous-oasis-11685... free

// /MONGODB_URI: mongodb://heroku_ww9dbxjw:bq6umoritesqhk01na8jqc63m4@ds161742.mlab.com:61742/heroku_ww9dbxjw
// To drop database, in server.js file use:
 // mongoose.connect('mongodb://localhost/mydatabase',function(){
//     /* Drop the DB */
//     mongoose.connection.db.dropDatabase();
// });

// See http://mongoosejs.com/docs/connections.html#use-mongo-client re: deprecation warning from terminal. . .here are the connect examples from docs:
// // Using `mongoose.connect`...
// var promise = mongoose.connect('mongodb://localhost/myapp', {
//   useMongoClient: true,
//   /* other options */
// });
// // Or `createConnection`
// var promise = mongoose.createConnection('mongodb://localhost/myapp', {
//   useMongoClient: true,
//   /* other options */
// });
// promise.then(function(db) {
//   /* Use `db`, for instance `db.model()`
// });
// // Or, if you already have a connection
// connection.openUri('mongodb://localhost/myapp', { /* options */ });

// Note to self: Other attempts and notes.
// mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku_q704sxx4:ifgiglkhn5je05sm3v3nt3othn@ds157342.mlab.com:57342/heroku_q704sxx4")

// var db = process.env.MONGODB_URI || "mongodb://heroku_q704sxx4:ifgiglkhn5je05sm3v3nt3othn@ds157342.mlab.com:57342/heroku_q704sxx4")
// //

// JM's Heroku app
//
