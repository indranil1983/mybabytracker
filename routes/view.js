var path    = require("path");

exports.home=function(req,res){	
	console.log(path.join(__dirname+'/html/home.html'));
	res.render('./home.html');
};