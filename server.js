// server.js

// set up ======================================================================
// get all the tools we need
express  = require('express');
var app      = express();
var morgan  = require('morgan');
var cookieParser     = require('cookie-parser');
var bodyParser     = require('body-parser');
var port     = process.env.PORT || 8080;
var path = require('path');

// configuration ===============================================================
database = require("./database/database");

var pathString = path.join(__dirname,'app');


var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    // set up our express application
	app.use(morgan('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use('/api/database', database.api);
	
	//app.use(flash()); // use connect-flash for flash messages stored in session
	app.use(express.static(__dirname + '/app'));
}	

// routes ======================================================================
/////////////// APPLICATION ROUTES ///////////////
app.get('/', function(req, res){
	res.sendfile(pathString + '\\' + 'index.html');
});

app.get('/:name', function(req, res){
	var name = req.params.name;
	res.sendfile(pathString + '\\' + name + '.html');
});


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app;