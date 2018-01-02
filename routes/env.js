/**
 * http://usejsdoc.org/
 */
var dbName = "/mybabytracker";
//exports.db='mongodb://192.168.56.102:27017/mybabytracker';
exports.profile="Rudraksh";

exports.db = 'mongodb://'+process.env.MONGODB_USER + ":" +  process.env.MONGODB_PASSWORD + "@" + process.env.DATABASE_SERVICE_NAME + dbName;
