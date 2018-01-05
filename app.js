
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , config=require('./routes/env')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

require('./mongodao/mongoConnect.js');
var feeding=require('./routes/feeding');
var temperature=require('./routes/temperature');
var diaper=require('./routes/diaper');

var app = express();

// all environments
app.set('port', config.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/feedRightStart', feeding.rightStart);
app.get('/feedRightStop', feeding.rightStop);
app.get('/feedLeftStart', feeding.leftStart);
app.get('/feedLeftStop', feeding.leftStop);

app.get('/feedFetchAll', feeding.fetchAll);
//app.get('/feedClearAll', feeding.clearAll);

//temeprature
app.get('/noteTemperature', temperature.noteTemperature);

app.get('/changeBothDiaper', diaper.changeBothDiaper);

app.get('/changePeeDiaper', diaper.changePeeDiaper);

app.get('/changePottyDiaper', diaper.changePottyDiaper);
app.get('/diaperReport', diaper.diaperReport);
app.get('/temperatureReport', temperature.temperatureReport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
