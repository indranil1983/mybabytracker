//Import the mongoose module
var mongoose = require('mongoose');
var mongoDbConfig=require('../routes/env');

//Set up default mongoose connection
//var mongoDB = 'mongodb://127.0.0.1/my_database';
var dbURI = mongoDbConfig.db;
mongoose.connect(dbURI, {
  useMongoClient: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//CONNECTION EVENTS
//When successfully connected
db.on('connected', function () {
	console.log('Mongoose default connection open to ' + dbURI);
});

//If the connection throws an error
db.on('error',function (err) {
	console.log('Mongoose default connection error: ' + err);
});

//When the connection is disconnected
db.on('disconnected', function () {
	console.log('Mongoose default connection disconnected');
});

//If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
	db.close(function () {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});


//BRING IN YOUR SCHEMAS & MODELS
//For example
require('./feedModel');


/*feedModel = mongoose.model('feedModel');
feedModel.create({side:'right',startTime:new Date()});

feedModel.find({endTime:{ $exists: false }},null,{sort:{startTime:1}}, function (err, doc) {
	if(err){
        console.log("Something wrong when updating data!"+err);
    }

    console.log(doc);
	});*/

console.log("-------------------------");

/*
*/