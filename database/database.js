module.exports = (function() {
    'use strict';
	var pg = require('pg');
	var conString = "postgres://postgres:admin@localhost:5432/postgres";

	var client = new pg.Client(conString);
	client.connect();
	
	var api = express.Router();
	var msps = require("./msps");
	msps.start(client);
	
	var mlas = require("./mlas");
	mlas.start(client);
	
	var lords = require("./lords");
	lords.start(client);
	
	api.get('/', function(req, res) {
        res.send("Hello, this is the database!\n")
    });
	
	api.use('/msps', msps.api);
	api.use('/mlas', mlas.api);
	api.use('/lords', lords.api);
	
    return {api: api, client: client};

	
}(module || {}));