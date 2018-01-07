exports.checkCurrentDate= function(inputDate){
	// Get today's date
	var todaysDate = new Date();

	// call setHours to take the time out of the comparison
	if(inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
	    return true;
	}
};


exports.getTimeZoneSpecificDate=function(dt){
	var d = new Date();
	var n = d.getTimezoneOffset();
	var secOffset = n*60;
	var offDtTime = new Date(dt.getTime() - secOffset * 1000);
	return offDtTime;	
};