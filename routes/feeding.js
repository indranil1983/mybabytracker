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
	    	//res.send("fetchAll  successfully returned "+docs);
	    	if(docs.length==0){
	    		res.send("fetchAll  no data returned");
	    	}else{
	    		var responseString = [];
	    		for (var i = 0; i < docs.length; i++) {
					var side=docs.side;
					var startTime=docs.startTime;
					var endTime=docs.endTime;
					var duration=null;
					if(endTime!=null){
						duration = Math.abs(endTime.getTime() - startTime.getTime());
					}					
					responseString.push({"side":side,"startTime":startTime,"endTime":endTime,"duration":duration});
				}
	    		res.send("fetchAll data returned"+responseString);
	    	}	    	
	    	console.log(responseString);
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