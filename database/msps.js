module.exports = (function() {
    'use strict';
    var api = express.Router();
	var client;
	
	function start(connection){
		client = connection;
	}
	
	function getAll(callback){
		client.query("SELECT xpath('count(//MSP)',xmltest[2]) as nrMSP FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function nrLeaves(nomeMSP,callback){
		var txt = '"' + nomeMSP + '"';
		var txt2 = '"still"';
		client.query("SELECT xpath('count(//MSP[Name=" + txt + "]/Membership[not(contains(LeftReason/text()," + txt2 + "))]/LeftHouse)',xmltest[2]) as left, UNNEST(xpath('//MSP[Name=" + txt + "]/Membership/LeftReason[not(contains(text()," + txt2 + "))]/text()',xmltest[2]))::text as reasons FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function currentParty(nomeMPS,callback){
		var txt = '"' + nomeMPS + '"';
		var txt2 = '"still_in_office"';
		client.query("SELECT xpath('//MSP[Name=" + txt + "]/Membership[LeftReason=" + txt2 + "]/Party/text()',xmltest[2]) as Party, xpath('//MSP[Name=" + txt + "]/Membership[LeftReason=" + txt2 + "]/Constituency/text()',xmltest[2]) as Constituency, xpath('//MSP[Name=" + txt + "]/Membership[LeftReason=" + txt2 + "]/Title/text()',xmltest[2]) as Title FROM teste", function(err, results)
		{
			console.log(err);
			callback(err,results);
		});
	};
	
	function countMSPs(callback){
		client.query("select xpath('count(//MSP)',xmltest[2]) from teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function oldest(callback){
		client.query("SELECT xpath('//MSP[not(@id > ../MSP/@id)]/Name/text()',xmltest[2]) as nome FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function getAll(callback){
		client.query("SELECT UNNEST(xpath('//MSP/Name/text()',xmltest[2]))::text as name FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function oldest(callback){
		client.query("SELECT xpath('//MSP[not(@id > ../MSP/@id)]/Name/text()',xmltest[2]) as nome FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function countWord(nameMSP,word,callback){
		var txt = '"' + nameMSP +'"';
		var txt2 = '"' + word +'"';
		client.query("SELECT xpath('count(//MSP[Name=" + txt + "]/Debates/Debate/Body/p[contains(text()," + txt2 + ")])',xmltest[2]) FROM teste;", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function mostTalkedDebate(nameMSP,callback){
		var txt = '"' + nameMSP + '"';
		var name = "";
		var max = 0;
		var count = 0;
		var x = 0;
		client.query("SELECT DISTINCT UNNEST(xpath('//MSP[Name=" + txt + "]/Debates/Debate/Theme/text()',xmltest[2]))::text FROM teste;", function(err, results)
		{
			console.log(results.rows);
			for(x=0;x<results.rows.length;x++)
			{
				var txt2 = '"' + results.rows[x].unnest +'"';
				client.query("SELECT UNNEST(xpath('count(//MSP[Name=" + txt + "]/Debates/Debate[contains(Theme/text()," + txt2 + ")])',xmltest[2]))::text FROM teste;", function(err1, results1)
				{
					if(count==results.rows.length-1)
					{
						var arr = {
							theme : name,
							count : max
						}
						callback(err,arr);
					}
					if(results1.rows[0].unnest>max)
					{
						name = txt2;
						max = results1.rows[0].unnest;
					}
					count +=1;
					console.log(results1.rows[0].unnest);
				});
			}
		});
	};
	
	function questions(nameMSP,theme,callback){
		var txt = '"' + nameMSP +'"';
		var txt2 = '"' + theme +'"';
		var txt3 = '"?"';
		client.query("SELECT UNNEST(xpath('//MSP[Name=" + txt + "]/Debates/Debate[contains(Theme/text()," + txt2 + ")]/Body/p[contains(text()," + txt3 + ")]/text()',xmltest[2]))::text FROM teste;", function(err, results)
		{
			var questions = [];
			for(var x=0;x<results.rows.length;x++)
			{
				var res = results.rows[x].unnest.split(/[?]/);
				for(var y=0;y<res.length;y++)
				{
					res[y] = res[y] + '?';
				}
				var res = results.rows[x].unnest.split(/[.!;\n]/);
				for(var y=0;y<res.length;y++)
				{
					if(res[y].indexOf("?")>-1)
					{
						questions.push(res[y]);
					}
				}
			}
			callback(err,questions);
		});
	};
	
	function themes(callback){
		client.query("SELECT DISTINCT UNNEST(xpath('//MSP/Debates/Debate/Theme/text()',xmltest[2]))::text FROM teste;", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function numberOfSessions(theme,callback){
		var txt = '"' + theme +'"';
		client.query("SELECT DISTINCT UNNEST(xpath('//MSP/Debates/Debate[contains(Theme/text()," + txt + ")]/Date/text()',xmltest[2]))::text FROM teste;", function(err, results)
		{
			var d = results.rows[0].unnest;
			var d2 = results.rows[results.rows.length-1].unnest;

			var year = parseInt(d.substring(0, 4),10); 
			var month = parseInt(d.substring(3,5),10); 
			var day = parseInt(d.substring(6, 19),10); 
			var date1 = new Date(year, month-1, day);
			console.log(date1);
			var year = parseInt(d2.substring(0, 4),10); 
			var month = parseInt(d2.substring(3,5),10); 
			var day = parseInt(d2.substring(6, 19),10); 
			var date2 = new Date(year, month-1, day);
			console.log(date2);
			var aDay = 24*60*60*1000;
			var diff = Math.abs((date1.getTime()-date2.getTime())/aDay);
			callback(err,diff);
		});
	};
	
	function sameMotions(nameMSP,nameMSP2,callback){
		var txt = '"' + nameMSP +'"';
		var txt2 = '"' + nameMSP2 +'"';
		client.query("SELECT DISTINCT UNNEST(xpath('//MSP[Name=" + txt + "]/Debates/Debate/Theme/text()',xmltest[2]))::text  FROM teste;", function(err, results)
		{
			client.query("SELECT DISTINCT UNNEST(xpath('//MSP[Name=" + txt2 + "]/Debates/Debate/Theme/text()',xmltest[2]))::text  FROM teste;", function(err1, results1)
			{
				console.log(results.rows);
				console.log("sdasdad");
				console.log("dadsa");
				console.log(results1.rows);
				var count = 0;
				var sameMotions = [];
				for(var x=0;x<results.rows.length;x++)
				{
					for(var y=0;y<results1.rows.length;y++)
					{
						if(results.rows[x].unnest==results1.rows[y].unnest)
						{
							count += 1;
							sameMotions.push(results.rows[x]);
						}
					}
				}
				var res = {
					count : count,
					sameMotions : sameMotions
				};
				callback(err1,res);
			});
		});
	};
	
	function debates(nameMSP,callback){
		var txt = '"' + nameMSP +'"';
		client.query("SELECT DISTINCT UNNEST(xpath('//MSP[Name=" + txt + "]/Debates/Debate/Theme/text()',xmltest[2]))::text as debate FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
    api.post('/', function(req, res) {
        getAll(function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results.rows
				});	
		});
    });
	
	api.post('/numberOfSessions', function(req, res) {
		var theme = req.body.theme;
		numberOfSessions(theme,function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results
				});	
		});
    });
	
	api.post('/debates', function(req, res) {
		var nameMSP = req.body.nameMSP;
		console.log(nameMSP);
		console.log("aqui");
		debates(nameMSP,function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results.rows
				});	
		});
    });
	
	api.post('/sameMotions', function(req, res) {
		var nameMSP = req.body.nameMSP1;
		var nameMSP2 = req.body.nameMSP2;
		sameMotions(nameMSP,nameMSP2,function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results
				});	
		});
    });
	
	api.post('/getAll', function(req, res) {
		getAll(function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results.rows
				});	
		});
    });
	
	api.post('/count', function(req, res) {
		countMSPs(function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results.rows
				});	
		});
    });
	
	api.post('/leftHouse', function(req, res) {
		var nomeMSP = req.body.nomeMSP;
        nrLeaves(nomeMSP,function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results.rows
				});	
		});
    });
	
	api.post('/current', function(req, res) {
		var nomeMSP = req.body.nomeMSP;
        currentParty(nomeMPS,function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results.rows
				});	
		});
    });
	
	api.post('/oldest', function(req, res) {
		oldest(function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results.rows
				});	
		});
    });
	
	api.post('/countWord', function(req, res) {
		var nameMSP = req.body.nameMSP;
		var word = req.body.word;
		countWord(nameMSP,word,function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results.rows
				});	
		});
    });
	
	api.post('/mostTalkedDebate', function(req, res) {
		var nameMSP = req.body.nameMSP;
		mostTalkedDebate(nameMSP,function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results
				});	
		});
    });
	
	api.post('/questions', function(req, res) {
		var nameMSP = req.body.nameMSP;
		var theme = req.body.theme;
		questions(nameMSP,theme,function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results
				});	
		});
    });

	api.post('/themes', function(req, res) {
		themes(function(err,results)
		{
			console.log(results);
			if(err)
				res.send({
					success: false,
					results: err
				});
			else
				res.send({
					success: true,
					results: results.rows
				});	
		});
    });
		
    return {api: api, start: start};
}(module || {}));
