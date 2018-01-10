var path    = require("path");

exports.home=function(req,res){	
	console.log(path.join(__dirname+'/html/home.html'));
	res.render('./home.html');
};
exports.feedDetail=function(req,res){	
	console.log(path.join(__dirname+'/html/feedDetail.html'));
	res.render('./feedDetail.html');
};

exports.temperatureDetail=function(req,res){
	res.render('./temperatureDetail.html');
};

exports.cleaningDetail=function(req,res){
	res.render('./cleaningDetail.html');
};

exports.photoDetails=function(req,res){
	res.render('./photoDetails.html');
};