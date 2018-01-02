var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var feedSchema = new Schema({
    profile:String,
	side: String,
    startTime: Date,
    endTime:Date
});

//Compile model from schema
var feedModel = module.exports = mongoose.model('feedModel', feedSchema );

console.log("FeedModel loaded");