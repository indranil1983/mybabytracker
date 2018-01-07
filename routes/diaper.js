var mongoose = require( 'mongoose' );
var config=require('../routes/env');
var util = require('./util.js');

var diaperModel = mongoose.model('diaperModel');

exports.changeBothDiaper = function(req, res){
	console.log("changeBothDiaper started");
	insertDiaper('both');
	console.log("changeBothDiaper done");
	res.send("changeBothDiaper successfully updated");
	
};
exports.changePeeDiaper = function(req, res){
	console.log("changePeeDiaper started");
	insertDiaper('pee');
	console.log("changePeeDiaper done");
	res.send("changeBothDiaper successfully updated");
	
};
exports.changePottyDiaper = function(req, res){
	console.log("changePottyDiaper started");
	insertDiaper('potty');
	console.log("changePottyDiaper done");
	res.send("changeBothDiaper successfully updated");
	
};

exports.diaperReport = function(req, res){
	console.log("fetchDiaperAll started");
	var j=[];
	diaperModel.find({}, function(err, docs) {
	    if (!err){ 
	    	//res.send("fetchAll  successfully returned "+docs);
	    	if(!docs.length){
	    		res.send("fetchAll diaperModel no data returned");
	    	}else{
	    		var responseString = [];
	    		for (var i = 0; i < docs.length; i++) {
					var pee=docs[i].pee;
					var noteTime=docs[i].noteTime;
					var potty=docs[i].potty;
					responseString.push({"pee":pee,"noteTime":noteTime,"potty":potty});
				}
	    		res.send("fetchAll data diaperModel returned"+JSON.stringify(responseString));
	    	}	    	
	    	console.log(responseString);
	    }else {res.send("fetchAll diaperModel error returned "+err)};	
	});
	
};

exports.countToday= function(req, res){
	var count = 0;
	diaperModel.find({}, function(err, docs) {
	    if (!err){ 
	    	//res.send("fetchAll  successfully returned "+docs);
	    	if(!docs.length){
	    		res.send(JSON.stringify({"count":count}));
	    	}
	    	else{
	    		var responseString = [];
	    		var d = new Date();
	    		var n = d.getTimezoneOffset();
	    		var secOffset = n*60;
	    		console.log("offset seconds"+secOffset);
	    		console.log("all doc "+docs.length+" details:- "+docs);
	    		for (var i = 0; i < docs.length; i++) {
					var noteTime=docs[i].noteTime;
					console.log("noteTIme"+noteTime);
					if(util.checkCurrentDate(noteTime)){
						count++;
					}
					
				}
	    		res.send({"count":count});
	    	}	    	
	    	console.log(JSON.stringify(responseString, null, "\t"));
	    }else {res.send("fetchAll  error returned "+err)};	
	});
};

function insertDiaper(type){
	if('both'==type){
		diaperModel.create({profile:config.profile,
			pee: true,
			potty:true,
		    noteTime: new Date()});	
	}
	else if('pee'==type){
		diaperModel.create({profile:config.profile,
			pee: true,
			potty:false,
		    noteTime: new Date()});	
	}else if('potty'==type){
		diaperModel.create({profile:config.profile,
			pee: false,
			potty:true,
		    noteTime: new Date()});	
	}
	else
	{
		diaperModel.create({profile:config.profile,
			pee: false,
			potty:false,
		    noteTime: new Date()});	
	}
	
}