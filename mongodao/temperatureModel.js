var mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

//Define a schema
var Schema = mongoose.Schema;

var temperatureSchema = new Schema({
    profile:String,
	temperature: String,
    noteTime: Date
});

temperatureSchema.plugin(timeZone);

//Compile model from schema
var temperatureModel = module.exports = mongoose.model('temperatureModel', temperatureSchema );

console.log("tempearatureModel loaded");