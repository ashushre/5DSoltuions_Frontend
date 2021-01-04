var mongoose = require('mongoose');
//used on 29-Dec-2017
mongoose.Promise = require("bluebird");
var config = require('./config');

//Mongo Database for Production server
var dbPath = config.dbPath;




mongoose.connect(dbPath, {useMongoClient: true});
var db = mongoose.connection;

db.on('error', function (err) {
	console.log('error occured from db ' + err);

    console.log(process)
    mongoose.connect(dbPath);
});


db.on('connected', function connectedDb() {
	
	console.log('mongo connected successfully' + dbPath);
});
db.on('disconnected', function disconnectedDb() {

	console.log('mongo disconnected');
	mongoose.connect(dbPath);
});

exports.mongoose = mongoose;
