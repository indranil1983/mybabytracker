var mongoose = require( 'mongoose' );
var config=require('../routes/env');

var tempearatureModel = mongoose.model('temperatureModel');

exports.noteTemperature = function(req, res){
	console.log("rightStart started");
	var temperature = req.query.temperature;
	if(temperature){
		console.log("note temperature was "+temperature);
		tempearatureModel.create({profile:config.profile,temperature:temperature,noteTime:new Date()});	
		res.send("note temperture  successfully updated");
	}
	else{
		res.send("missing temperature param");
	}
	
};