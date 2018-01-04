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

exports.tempearatureReport = function(req, res){
	console.log("tempearatureReport started");
	var j=[];
	tempearatureModel.find({}, function(err, docs) {
	    if (!err){ 
	    	//res.send("fetchAll  successfully returned "+docs);
	    	if(docs.length){
	    		res.send(" tempearatureReport no data returned");
	    	}else{
	    		var responseString = [];
	    		for (var i = 0; i < docs.length; i++) {
					var temperature=docs[i].temperature;
					var noteTime=docs[i].noteTime;
					responseString.push({"temperature":temperature,"noteTime":noteTime});
				}
	    		res.send("tempearatureReport returned"+JSON.stringify(responseString));
	    	}	    	
	    	console.log(responseString);
	    }else {res.send("tempearatureReport error returned "+err)};	
	});
	
};