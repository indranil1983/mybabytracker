var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var temperatureSchema = new Schema({
    profile:String,
	temperature: String,
    noteTime: Date
});

//Compile model from schema
var temperatureModel = module.exports = mongoose.model('temperatureModel', temperatureSchema );

console.log("tempearatureModel loaded");