var mongoose = require( 'mongoose' );
var config=require('../routes/env');

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