var mongoose = require( 'mongoose' );
var config=require('../routes/env');

feedModel = mongoose.model('feedModel');

exports.rightStart = function(req, res){
	console.log("rightStart started");
	feedModel.create({profile:config.profile,side:'right',startTime:new Date()});	
	res.send("rightStart  successfully updated");
};

exports.fetchAll = function(req, res){
	console.log("fetchAll started");
	var j=[];
	feedModel.find({}, function(err, docs) {
	    if (!err){ 
	    	res.send("fetchAll  successfully returned "+docs);
	    	console.log(docs);
	    }else {res.send("fetchAll  error returned "+err)};	
	});
	
};

exports.rightStop = function(req, res){
	feedModel.findOneAndUpdate({endTime:{ $exists: false },side:"right"}, { $set: {endTime:new Date()}}, {sort:{startTime:-1},new:true}, 
	  function (err, doc) {
		if(err){
	        console.log("Something wrong when updating data!"+err);
	        res.send("error in updating right stop");
	    }
	    console.log(doc);
	});	
	res.send(" rightStop successfully updated");
};

exports.leftStart = function(req, res){
	feedModel.create({profile:config.profile,side:'left',startTime:new Date()});	
	res.send("leftStart successfully updated");
};

exports.leftStop = function(req, res){
	feedModel.findOneAndUpdate({endTime:{ $exists: false },side:"left"}, { $set: {endTime:new Date()}}, {sort:{startTime:-1},new:true}, 
	  function (err, doc) {
		if(err){
	        console.log("Something wrong when updating data!"+err);
	        res.send("error in updating right stop");
	    }
	    console.log(doc);
	});	
	res.send("leftStop successfull updated");
};