var mongoose = require( 'mongoose' );
var config=require('../routes/env');
var util = require('./util.js');

var feedModel = mongoose.model('feedModel');

exports.Start = function(req, res){
	console.log("rightStart started");
	feedModel.create({profile:config.profile,side:'',startTime:new Date()});	
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
					var side=docs[i].side;
					var startTime=docs[i].startTime;
					var endTime=docs[i].endTime;
					var duration=null;
					if(endTime!=null){
						duration = Math.abs(endTime.getTime() - startTime.getTime());
					}					
					responseString.push({"side":side,"startTime":startTime,"endTime":endTime,"duration":duration});
				}
	    		res.send("fetchAll data returned <br>"+JSON.stringify(responseString, null, "\t"));
	    	}	    	
	    	console.log(JSON.stringify(responseString, null, "\t"));
	    }else {res.send("fetchAll  error returned "+err)};	
	});
	
};

exports.Stop = function(req, res){
	feedModel.findOneAndUpdate({endTime:{ $exists: false }}, { $set: {endTime:new Date()}}, {sort:{startTime:-1},new:true}, 
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
	res.send("leftStop successfully updated");
};

exports.clearAll= function(req, res){
	feedModel.remove({},function(err) {
		if(err) { return handleError(res, err); }
		return res.send(204);
	});
};


exports.countToday= function(req, res){
	var count = 0;
	var totDuration=0;
	//console.log("req.body"+JSON.stringify(req.body));
	var startDate=req.body.startDate;
	var endDate=req.body.endDate;
	//console.log("startDate"+startDate+" endDate"+endDate);
	feedModel.find({startTime: {
	        $gte: startDate,
	        $lt:endDate
	    }}, function(err, docs) {
	    if (!err){ 
	    	//res.send("fetchAll  successfully returned "+docs);
	    	if(!docs.length){
	    		res.send(JSON.stringify({"count":count}));
	    	}
	    	else{
	    		var responseString = [];
	    		console.log(" feed docs:- "+docs);
	    		for (var i = 0; i < docs.length; i++) {
					var side=docs[i].side;
					var startTime=docs[i].startTime;
					//var offstartTime = util.getTimeZoneSpecificDate(startTime);
					var offEndTime=0;
					var endTime=docs[i].endTime;
					/*if(endTime){
						offEndTime = util.getTimeZoneSpecificDate(endTime);
					}*/
					
					var duration=null;
					if(endTime!=null){
						duration = Math.abs((endTime.getTime() - startTime.getTime())/60000);//mins
					}
					else duration=5;//mins
					console.log(duration);
					if(util.checkCurrentDate(startTime)){
						count++;
						totDuration=totDuration+duration;
					}
					
				}
	    		res.send({"count":count,"duration":Math.ceil(totDuration)});
	    	}	    	
	    	console.log(JSON.stringify(responseString, null, "\t"));
	    }else {res.send("fetchAll  error returned "+err)};	
	});
};


