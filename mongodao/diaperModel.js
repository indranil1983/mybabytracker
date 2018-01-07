var mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

//Define a schema
var Schema = mongoose.Schema;

var diaperSchema = new Schema({
    profile:String,
	pee: Boolean,
	potty:Boolean,
    noteTime: Date
});

diaperSchema.plugin(timeZone);
//Compile model from schema
var diaperModel = module.exports = mongoose.model('diaperModel', diaperSchema );

console.log("diaperModel loaded");