
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , config=require('./routes/env')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var engines = require('consolidate');

require('./mongodao/mongoConnect.js');
var feeding=require('./routes/feeding');
var temperature=require('./routes/temperature');
var diaper=require('./routes/diaper');
var view=require('./routes/view');

var app = express();

// all environments
app.set("view options", {layout: false});  
app.set('port', config.PORT || 3000);
app.set('views', __dirname + '/html');
app.engine('html',  require('ejs').renderFile);
app.set('view engine', 'html');
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

app.get('/', view.home);
app.get('/users', user.list);

app.get('/feedStart', feeding.Start);
app.get('/feedStop', feeding.Stop);
//app.get('/feedLeftStart', feeding.leftStart);
//app.get('/feedLeftStop', feeding.leftStop);

app.get('/feedFetchAll', feeding.fetchAll);
//app.get('/feedClearAll', feeding.clearAll);

//temeprature
app.get('/noteTemperature', temperature.noteTemperature);

app.get('/changeBothDiaper', diaper.changeBothDiaper);

app.get('/changePeeDiaper', diaper.changePeeDiaper);

app.get('/changePottyDiaper', diaper.changePottyDiaper);
app.get('/diaperReport', diaper.diaperReport);
app.get('/temperatureReport', temperature.temperatureReport);

app.post('/feedCountToday', feeding.countToday);
app.get('/lastTemperature', temperature.getLatestData);

app.post('/diaperCountToday', diaper.countToday);


app.get('/home', view.home);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
