
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , config=require('./routes/env')
  , user = require('./routes/user')
  , path = require('path');
var engines = require('consolidate');


require('./mongodao/mongoConnect.js');
var feeding=require('./routes/feeding');
var temperature=require('./routes/temperature');
var diaper=require('./routes/diaper');
var view=require('./routes/view');



var app = express();
var http = require('http').Server(app);


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
app.use(express.errorHandler());

app.get('/', view.home);
app.get('/feedDetail', view.feedDetail);

app.get('/users', user.list);

app.get('/feedStart', function(req, res){
	feeding.Start(req, res);
	io.emit('requestReload', {});
});
app.get('/feedStop',  function(req, res){
	feeding.Stop(req, res);
	io.emit('requestReload', {});
});
//app.get('/feedLeftStart', feeding.leftStart);
//app.get('/feedLeftStop', feeding.leftStop);

app.get('/feedFetchAll', feeding.fetchAll);
//app.get('/feedClearAll', feeding.clearAll);

//temeprature
app.get('/noteTemperature', function(req, res){
	 temperature.noteTemperature(req, res);
	io.emit('requestReload', {});
});

app.get('/changeBothDiaper', function(req, res){
	 diaper.changeBothDiaper(req, res);
		io.emit('requestReload', {});
	});

app.get('/changePeeDiaper',  function(req, res){
	diaper.changePeeDiaper(req, res);
	io.emit('requestReload', {});
});

app.get('/changePottyDiaper',function(req, res){
	diaper.changePottyDiaper(req, res);
	io.emit('requestReload', {});
});
app.get('/diaperReport', diaper.diaperReport);

app.get('/temperatureReport',function(req, res){
	 temperature.temperatureReport(req, res);
	io.emit('requestReload', {});
});

app.post('/feedCountToday', feeding.countToday);
app.get('/lastTemperature', temperature.getLatestData);

app.post('/diaperCountToday', diaper.countToday);


app.get('/home', view.home);

http.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io')(http);

io.on('connection', function(socket){
	  console.log('a user connected');
	});
