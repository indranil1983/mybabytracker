var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var diaperSchema = new Schema({
    profile:String,
	pee: Boolean,
	potty:Boolean,
    noteTime: Date
});

//Compile model from schema
var diaperModel = module.exports = mongoose.model('diaperModel', diaperSchema );

console.log("diaperModel loaded");