exports.checkCurrentDate= function(inputDate){
	// Get today's date
	var todaysDate = new Date();
	/*var n = todaysDate.getTimezoneOffset();
	var secOffset = n*60;
	var offtodaysDate = new Date(todaysDate.getTime() - secOffset * 1000);*/
	//n = this.getTimeZoneSpecificDate(todaysDate);
	// call setHours to take the time out of the comparison
	console.log("input date "+inputDate+" todays Date" +todaysDate );
	if(inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
	    console
		return true;
	}
};


exports.getTimeZoneSpecificDate=function(dt){
	var d = new Date();
	var offset = d.getTimezoneOffset();
	console.log("offset seconds"+offset);
	if(dt){
	console.log(dt);
	var secOffset = 21600;
	var offDtTime = new Date(dt.getTime() - secOffset * 1000);
	return offDtTime;
	}
	else return null;
};