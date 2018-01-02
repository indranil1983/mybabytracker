/**
 * http://usejsdoc.org/
 */
var dbName = "/mybabytracker";
//exports.db='mongodb://192.168.56.102:27017/mybabytracker';
exports.profile="Rudraksh";

exports.db = 'mongodb://'+process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + dbName;
