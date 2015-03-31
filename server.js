var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var app = express();
var port = process.env.PORT || 5000;
var enviroment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
app.set('views',__dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:false}));

//only on development mode
if( 'development' === enviroment ){
    app.use(errorHandler({dumpExceptions: true, showStack:true}));
}

var controllers = require('./controllers/index')();
require('./routes')(app,controllers);

app.listen(port,function () {
	console.log('Server running on port %d in %s mode ', port, enviroment);
});