var mongoose = require( 'mongoose' );
var config=require('../routes/env');
var util = require('./util.js');
var dateFormat = require('dateformat');

var tempearatureModel = mongoose.model('temperatureModel');

exports.noteTemperature = function(req, res){
	console.log("noteTemperature started");
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

exports.temperatureReport = function(req, res){
	console.log("temperatureReport started");
	var j=[];
	tempearatureModel.find({}, function(err, docs) {
	    if (!err){ 
	    	//res.send("fetchAll  successfully returned "+docs);
	    	if(!docs.length){
	    		res.send(" temperatureReport no data returned");
	    	}else{
	    		var responseString = [];
	    		for (var i = 0; i < docs.length; i++) {
					var temperature=docs[i].temperature;
					var noteTime=docs[i].noteTime;
					responseString.push({"temperature":temperature,"noteTime":noteTime});
				}
	    		res.send("temperatureReport returned"+JSON.stringify(responseString));
	    	}	    	
	    	console.log(responseString);
	    }else {res.send("temperatureReport error returned "+err)};	
	});
	
};

exports.getLatestData=function(req,res){
	/*$today = new Date();
	$yesterday = new Date($today);
	$yesterday.setDate($today.getDate() - 1);*/ 
	var query = tempearatureModel.find({temperature:{ $exists: true }}).sort({'noteTime':-1}).limit(1);
	query.exec(function(err, docs) {

	    if (!err){ 
	    	//res.send("fetchAll  successfully returned "+docs);
	    	if(!docs.length){
	    		res.send(" temperatureReport no data returned");
	    	}
	    	else{
	    		console.log("temperature docs "+docs);
	    		for (var i = 0; i < docs.length; i++) {
	    			var notedAt = docs[i].noteTime;
	    			//notedAt = dateFormat(notedAt, "dS mmm h:MM TT");
	    			console.log("notedAt "+notedAt);
	    			//var noteOffSetTime=util.getTimeZoneSpecificDate(notedAt);
		    		res.send({"temperature":docs[i].temperature,"measuredAt":notedAt});
	    		}
	    		
	    	}	    	
	    }else {res.send("temperatureReport error returned "+err);}		
	});
};