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
	    		res.send({});
	    	}else{
	    		var responseString = [];
	    		for (var i = 0; i < docs.length; i++) {
					var pee=docs[i].pee;
					var noteTime=docs[i].noteTime;
					var potty=docs[i].potty;
					responseString.push({"pee":pee,"noteTime":noteTime,"potty":potty});
				}
	    		res.send(responseString);
	    	}	    	
	    	console.log(responseString);
	    }else {res.send({})};	
	});
	
};

exports.countToday= function(req, res){
	var count = 0;
	var startDate=req.body.startDate;
	var endDate=req.body.endDate;
	console.log("startDate"+startDate+"endtime"+endDate);
	diaperModel.find({noteTime: {
        $gte: startDate,
        $lt:endDate
    }},null,{sort:{noteTime:-1}}, function(err, docs) {
    	console.log("diaper docs"+docs);
    	if (!err){ 
	    	//res.send("fetchAll  successfully returned "+docs);
	    	if(!docs.length){
	    		
	    		res.send(JSON.stringify({"count":count,"lastChange":0}));
	    	}
	    	else{
	    		var lastChange=docs[0].noteTime;
	    		count=docs.length;
	    		res.send({"count":count,"lastChange":lastChange});
	    	}
	    }
	    else {
	    	res.send("fetchAll  error returned "+err)
	    };	
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