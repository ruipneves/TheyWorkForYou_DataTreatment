module.exports = (function() {
    'use strict';
    var api = express.Router();
	var client;
	
	function start(connection){
		client = connection;
	}
	
	function getAll(callback){
		client.query("SELECT xpath('count(//Lord)',xmltest[1]) as nrMSP FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function younger(callback){
		client.query("SELECT xpath('//Lord[not(@id > ../Lord/@id)]/Name/text()',xmltest[1]) FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function getAll(callback){
		client.query("SELECT UNNEST(xpath('//Lord/Name/text()',xmltest[1]))::text as name FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function getAllID(callback){
		client.query("SELECT UNNEST(xpath('//Lord/@id/text()',xmltest[1]))::text as id FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function countLords(callback){
		client.query("select xpath('count(//Lord)',xmltest[1]) from teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function debates(nameLord,callback){
		var txt = '"' + nameLord +'"';
		client.query("SELECT DISTINCT UNNEST(xpath('//Lord[Name=" + txt + "]/Debates/Debate/Theme/text()',xmltest[1]))::text as debate FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function countDebates(nameLord,callback){
		var txt = '"' + nameLord +'"';
		var txt2 = '"Motion to Take Note"';
		client.query("SELECT xpath('count(//Lord[Name=" + txt + "]/Debates/Debate/Theme/i[text()=" + txt2 + "])',xmltest[1]) FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function oldest(callback){
		client.query("SELECT xpath('//Lord[not(@id > ../Lord/@id)]/Name/text()',xmltest[1]) as nome FROM teste", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function countWord(nameLord,word,callback){
		var txt = '"' + nameLord +'"';
		var txt2 = '"' + word +'"';
		client.query("SELECT xpath('count(//Lord[Name=" + txt + "]/Debates/Debate/Body/p[contains(text()," + txt2 + ")])',xmltest[1]) FROM teste;", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function manyTimes(nameLord,word,type,callback){
		var txt = '"' + nameLord +'"';
		var txt2 = '"' + word +'"';
		var txt3 = '"' + type +'"';
		client.query("SELECT (xpath('count(//Lord[Name/text()=" + txt + "]/Debates/Debate[contains(Body/p/text()," + txt2 + ")]/Theme/i[text()=" + txt3 + "])',xmltest[1]))::text FROM teste;", function(err, results)
		{
			callback(err,results);
		});
	};
	
	function numberOfSessions(theme,callback){
		var txt = '"' + theme +'"';
		client.query("SELECT DISTINCT UNNEST(xpath('//Lord/Debates/Debate[contains(Theme/text()," + txt + ")]/Date/text()',xmltest[1]))::text FROM teste;", function(err, results)
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
	
	function approvedMotions(nameLord,callback){
		var txt = '"' + nameLord +'"';
		var txt2 = '"Motion agreed."';
		client.query("SELECT DISTINCT UNNEST(xpath('//Lord[Name=" + txt + "]/Debates/Debate/Theme/text()',xmltest[1]))::text  FROM teste;", function(err, results)
		{
			client.query("SELECT DISTINCT UNNEST(xpath('//Lord/Debates/Debate[Body/p[text()=" + txt2 + "]]/Theme/text()',xmltest[1]))::text FROM teste;", function(err1, results1)
			{
				var count = 0;
				for(var x=0;x<results.rows.length;x++)
				{
					for(var y=0;y<results1.rows.length;y++)
					{
						if(results.rows[x].unnest==results1.rows[y].unnest)
						{
							count += 1;
						}
					}
				}
				callback(err1,count);
			});
		});
	};
	
	function sameMotions(nameLord,nameLord2,callback){
		var txt = '"' + nameLord +'"';
		var txt2 = '"' + nameLord2 +'"';
		client.query("SELECT DISTINCT UNNEST(xpath('//Lord[Name=" + txt + "]/Debates/Debate/Theme/text()',xmltest[1]))::text  FROM teste;", function(err, results)
		{
			client.query("SELECT DISTINCT UNNEST(xpath('//Lord[Name=" + txt2 + "]/Debates/Debate/Theme/text()',xmltest[1]))::text  FROM teste;", function(err1, results1)
			{
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
	
	function questions(nameLord,theme,callback){
		var txt = '"' + nameLord +'"';
		var txt2 = '"' + theme +'"';
		var txt3 = '"?"';
		client.query("SELECT UNNEST(xpath('//Lord[Name=" + txt + "]/Debates/Debate[contains(Theme/text()," + txt2 + ")]/Body/p[contains(text()," + txt3 + ")]/text()',xmltest[1]))::text FROM teste;", function(err, results)
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
	
	function averageTime(callback){
		var txt = '"Motion agreed."';
		var total = 0;
		var count = 0;
		var emfalta = 0;
		var x=0;
		client.query("SELECT UNNEST(xpath('//Lord/Debates/Debate[Body/p[text()=" + txt + "]]/Theme/text()',xmltest[1]))::text FROM teste;", function(err, results)
		{
			console.log(results.rows);
			for(x=0;x<results.rows.length;x++)
			{
				var txt = '"' + results.rows[x].unnest +'"';
				client.query("SELECT DISTINCT UNNEST(xpath('//Lord/Debates/Debate[contains(Theme/text()," + txt + ")]/Date/text()',xmltest[1]))::text FROM teste;", function(err1, results1)
				{
					if(count+emfalta==results.rows.length-1) {
						var avg = total/count;
						callback(err,avg);
					}
						
					if(results1.rows[0] && results1.rows[results1.rows.length-1])
					{
						var d = results1.rows[0].unnest;
						var d2 = results1.rows[results1.rows.length-1].unnest;

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
						
						total += diff;
						count += 1;
					}
					else
						emfalta += 1;
				});
			}
		});
	};
	
	function mostTalkedDebate(nameLord,callback){
		var txt = '"' + nameLord + '"';
		var name = "";
		var max = 0;
		var count = 0;
		var x = 0;
		client.query("SELECT DISTINCT UNNEST(xpath('//Lord[Name=" + txt + "]/Debates/Debate/Theme/text()',xmltest[1]))::text FROM teste;", function(err, results)
		{
			console.log(results.rows);
			for(x=0;x<results.rows.length;x++)
			{
				var txt2 = '"' + results.rows[x].unnest +'"';
				client.query("SELECT UNNEST(xpath('count(//Lord[Name=" + txt + "]/Debates/Debate[contains(Theme/text()," + txt2 + ")])',xmltest[1]))::text FROM teste;", function(err1, results1)
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
	
	function getApprovedMotions(callback){
		var txt = '"Motion agreed."';
		client.query("SELECT UNNEST(xpath('//Lord/Debates/Debate[Body/p[text()=" + txt + "]]/Theme/text()',xmltest[1]))::text FROM teste;", function(err, results)
		{
			callback(err,results);
		});
	}
	
	function getTypes(callback){
		client.query("SELECT DISTINCT UNNEST(xpath('//Lord/Debates/Debate/Theme/i/text()',xmltest[1]))::text FROM teste;", function(err, results)
		{
			callback(err,results);
		});
	}
	
	function getManyTimesApproved(word,theme,callback){
		var txt = '"' + word + '"';
		var txt2 = '"' + theme + '"';
		client.query("SELECT UNNEST(xpath('count(//Lord/Debates/Debate[contains(Theme/text()," + txt2 + ")]/Body/p[contains(text()," + txt + ")])',xmltest[1]))::text FROM teste;", function(err, results)
		{
			callback(err,results);
		});
	}
	
	function getManyTimesType(nameLord,type,word,callback){
		var txt = '"' + nameLord + '"';
		var txt2 = '"' + type + '"';
		var txt3 = '"' + word + '"';
		client.query("SELECT UNNEST(xpath('count(//Lord[Name=" + txt + "]/Debates/Debate[contains(Theme/i/text()," + txt2 + ")]/Body/p[contains(text()," + txt3 + ")])',xmltest[1]))::text FROM teste;", function(err, results)
		{
			console.log(results);
			callback(err,results);
		});
	}
	
	function speech(nameLord,theme,callback){
		var txt = '"' + nameLord + '"';
		var txt2 = '"' + theme + '"';
		client.query("SELECT UNNEST(xpath('//Lord[Name=" + txt + "]/Debates/Debate[contains(Theme/text()," + txt2 + ")]/Body/p/text()',xmltest[1]))::text FROM teste;", function(err, results)
		{
			var total = 0;
			for(var x=0;x<results.rows.length;x++)
			{
				total += results.rows[x].unnest.length;
			}
			var arr = {
				speechSize : total,
				speech : results.rows
			};
			callback(err,arr);
		});
	}
	
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
	
	api.post('/younger', function(req, res) {
        younger(function(err,results)
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
	
	api.post('/getAllID', function(req, res) {
		getAllID(function(err,results)
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
		countLords(function(err,results)
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
	
	api.post('/debates', function(req, res) {
		var nameLord = req.body.nameLord;
		debates(nameLord,function(err,results)
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
	
	api.post('/countDebates', function(req, res) {
		var nameLord = req.body.nameLord;
		countDebates(nameLord,function(err,results)
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
		var nameLord = req.body.nameLord;
		var word = req.body.word;
		countWord(nameLord,word,function(err,results)
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
	
	api.post('/manyTimes', function(req, res) {
		var nameLord = req.body.nameLord;
		var word = req.body.word;
		var type = req.body.type;
		manyTimes(nameLord,word,type,function(err,results)
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
	
	api.post('/approvedMotions', function(req, res) {
		var nameLord = req.body.nameLord;
		approvedMotions(nameLord,function(err,results)
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
	
	api.post('/sameMotions', function(req, res) {
		var nameLord = req.body.nameLord;
		var nameLord2 = req.body.nameLord2;
		sameMotions(nameLord,nameLord2,function(err,results)
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
		var nameLord = req.body.nameLord;
		var theme = req.body.theme;
		questions(nameLord,theme,function(err,results)
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
	
	api.post('/averageTime', function(req, res) {
		averageTime(function(err,results)
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
	
	api.post('/mostTalkedDebate', function(req, res) {
		var nameLord = req.body.nameLord;
		mostTalkedDebate(nameLord,function(err,results)
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
	
	api.post('/getApprovedMotions', function(req, res) {
		getApprovedMotions(function(err,results)
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
	
	api.post('/getTypes', function(req, res) {
		getTypes(function(err,results)
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
	
	api.post('/getManyTimesApproved', function(req, res) {
		var word = req.body.word;
		var theme = req.body.theme;
		getManyTimesApproved(word,theme,function(err,results)
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
	
	api.post('/getManyTimesType', function(req, res) {
		var nameLord = req.body.nameLord;
		var word = req.body.word;
		var type = req.body.type;
		getManyTimesType(nameLord,type,word,function(err,results)
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
	
	api.post('/speech', function(req, res) {
		var nameLord = req.body.nameLord;
		var theme = req.body.theme;
		speech(nameLord,theme,function(err,results)
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
	
	
	
    return {api: api, start: start};
}(module || {}));
