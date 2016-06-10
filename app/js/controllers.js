(function() {

	var TheyWorkForYouControllers = angular.module('TheyWorkForYouControllers', []);
	
	TheyWorkForYouControllers.controller("indexController", function ($scope, $http, $location){
	});
	
	TheyWorkForYouControllers.controller("mspsController", function ($scope, $http){
		$scope.msps={};
		$http.post('/api/database/msps/getAll').
		  success(function(data, status, headers, config) {
			$scope.msps=data.results;
			}).
		  error(function(data, status, headers, config) {
			$scope.message = "Couldn't do it";
		  });
		
		$http.post('/api/database/msps/count').
		  success(function(data, status, headers, config) {
			$scope.total=data.results[0].xpath;
			}).
		  error(function(data, status, headers, config) {
			$scope.message = "Couldn't do it";
		  });
		  
		$http.post('/api/database/msps/themes').
		  success(function(data, status, headers, config) {
			$scope.temas=data.results;
			}).
		  error(function(data, status, headers, config) {
			$scope.message = "Couldn't do it";
		  });
		  
		$scope.leftHouse = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.reasons = {};
			$http.post('/api/database/msps/leftHouse',{"nomeMSP" : $scope.nomeMSP}).
			  success(function(data, status, headers, config) {
				$scope.leftH = true;
				$scope.totalLeft=data.results[0].left;
				$scope.reasons=data.results;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}  
		  
		$scope.ancient = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.reasons = {};
			$http.post('/api/database/msps/oldest').
			  success(function(data, status, headers, config) {
				$scope.old = true;
				$scope.ancient=data.results[0].nome;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.countWord = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.nrWord = "";
			$http.post('/api/database/msps/countWord',{"nameMSP" : $scope.MSPNameCountWord,"word" : $scope.word}).
			  success(function(data, status, headers, config) {
				$scope.nword = true;
				$scope.nrWord=data.results[0].xpath;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.mostTalkedDebate = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.debates = {};
			$scope.countDebates = "";
			$scope.ancient = "";
			$http.post('/api/database/msps/mostTalkedDebate',{"nameMSP":$scope.LordNamemostTalkedDebate}).
			  success(function(data, status, headers, config) {
				$scope.mostTalkedDebate = data.results.theme;
				$scope.mostTalkedDebateN = data.results.count;
				$scope.mostTalkedDebateShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.quests = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.debates = {};
			$scope.countDebates = "";
			$scope.ancient = "";
			$http.post('/api/database/msps/questions',{"nameMSP":$scope.nameMSPQuest,"theme":$scope.selectTheme}).
			  success(function(data, status, headers, config) {
				$scope.questions = data.results;
				$scope.questionsShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.numberOfSessions = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.WordsApprovedShow = false;
			$scope.questionsShow = false;
			$scope.nrWord = "";
			//var select = $scope.selectApproved.substr(0,$scope.selectApproved.length-4);
			$http.post('/api/database/msps/numberOfSessions',{"theme" : $scope.selectTheme2}).
			  success(function(data, status, headers, config) {
				$scope.nSessions = data.results;
				$scope.nSessionsShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.twoMSPS = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.WordsApprovedShow = false;
			$scope.questionsShow = false;
			$scope.nrWord = "";
			//var select = $scope.selectApproved.substr(0,$scope.selectApproved.length-4);
			$http.post('/api/database/msps/sameMotions',{"nameMSP1" : $scope.nameMSP1,"nameMSP2" : $scope.nameMSP2}).
			  success(function(data, status, headers, config) {
				$scope.nTwoMsps = data.results.count;
				$scope.mocoes = data.results.sameMotions;
				$scope.twoMSPSShow = true;
				$scope.nTwoMspsShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.debates = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.debates = {};
			$scope.countDebates = "";
			$scope.ancient = "";
			$http.post('/api/database/msps/debates',{"nameMSP":$scope.MSPNameDebates}).
			  success(function(data, status, headers, config) {
				$scope.debt = true;
				$scope.debates=data.results;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
	});
	
	TheyWorkForYouControllers.controller("mlasController", function ($scope, $http){
		$scope.mlas={};
		$http.post('/api/database/mlas/getAll').
		  success(function(data, status, headers, config) {
			$scope.mlas=data.results;
			}).
		  error(function(data, status, headers, config) {
			$scope.message = "Couldn't do it";
		  });
		
		$http.post('/api/database/mlas/count').
		  success(function(data, status, headers, config) {
			$scope.total=data.results[0].xpath;
			}).
		  error(function(data, status, headers, config) {
			$scope.message = "Couldn't do it";
		  });
		  
		  $http.post('/api/database/mlas/themes').
		  success(function(data, status, headers, config) {
			$scope.temas=data.results;
			}).
		  error(function(data, status, headers, config) {
			$scope.message = "Couldn't do it";
		  });
		  
		$scope.leftHouse = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.reasons = {};
			$http.post('/api/database/mlas/leftHouse',{"nomeMLA" : $scope.nomeMLA}).
			  success(function(data, status, headers, config) {
				$scope.leftH = true;
				$scope.totalLeft=data.results[0].left;
				$scope.reasons=data.results;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}  
		  
		$scope.ancient = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.reasons = {};
			$http.post('/api/database/mlas/oldest').
			  success(function(data, status, headers, config) {
				$scope.old = true;
				$scope.ancient=data.results[0].nome;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.countWord = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.nrWord = "";
			$http.post('/api/database/mlas/countWord',{"nameMLA" : $scope.MLANameCountWord,"word" : $scope.word}).
			  success(function(data, status, headers, config) {
				$scope.nword = true;
				$scope.nrWord=data.results[0].xpath;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.mostTalkedDebate = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.debates = {};
			$scope.countDebates = "";
			$scope.ancient = "";
			$http.post('/api/database/mlas/mostTalkedDebate',{"nameMLA":$scope.LordNamemostTalkedDebate}).
			  success(function(data, status, headers, config) {
				$scope.mostTalkedDebate = data.results.theme;
				$scope.mostTalkedDebateN = data.results.count;
				$scope.mostTalkedDebateShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		
		$scope.quests = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.debates = {};
			$scope.countDebates = "";
			$scope.ancient = "";
			$http.post('/api/database/mlas/questions',{"nameMLA":$scope.LordNamemostTalkedDebate,"theme":$scope.selectTheme}).
			  success(function(data, status, headers, config) {
				$scope.questions = data.results;
				$scope.questionsShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.numberOfSessions = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.WordsApprovedShow = false;
			$scope.questionsShow = false;
			$scope.nrWord = "";
			//var select = $scope.selectApproved.substr(0,$scope.selectApproved.length-4);
			$http.post('/api/database/mlas/numberOfSessions',{"theme" : $scope.selectTheme2}).
			  success(function(data, status, headers, config) {
				$scope.nSessions = data.results;
				$scope.nSessionsShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.twoMLAS = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.WordsApprovedShow = false;
			$scope.questionsShow = false;
			$scope.nrWord = "";
			//var select = $scope.selectApproved.substr(0,$scope.selectApproved.length-4);
			$http.post('/api/database/mlas/sameMotions',{"nameMLA1" : $scope.nameMLA1,"nameMLA2" : $scope.nameMLA2}).
			  success(function(data, status, headers, config) {
				$scope.nTwoMlas = data.results.count;
				$scope.mocoes = data.results.sameMotions;
				$scope.twoMLASShow = true;
				$scope.nTwoMlasShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.debates = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.debates = {};
			$scope.countDebates = "";
			$scope.ancient = "";
			$http.post('/api/database/mlas/debates',{"nameMLA":$scope.MLANameDebates}).
			  success(function(data, status, headers, config) {
				$scope.debt = true;
				$scope.debates=data.results;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
	});
	
	TheyWorkForYouControllers.controller("lordsController", function ($scope, $http){
		$scope.lords = {};
		$scope.lordsID = {};
		$scope.total = "";
		$http.post('/api/database/lords/getAll').
		  success(function(data, status, headers, config) {
			$scope.lords=data.results;
			}).
		  error(function(data, status, headers, config) {
			$scope.message = "Couldn't do it";
		  });
		
		$http.post('/api/database/lords/getApprovedMotions').
		  success(function(data, status, headers, config) {
			$scope.approvedMotions=data.results;
			}).
		  error(function(data, status, headers, config) {
			$scope.message = "Couldn't do it";
		  });

		$http.post('/api/database/lords/count').
		  success(function(data, status, headers, config) {
			$scope.total=data.results[0].xpath;
			}).
		  error(function(data, status, headers, config) {
			$scope.message = "Couldn't do it";
		  });
		  
		$http.post('/api/database/lords/getTypes').
		  success(function(data, status, headers, config) {
			$scope.types=data.results;
			}).
		  error(function(data, status, headers, config) {
			$scope.message = "Couldn't do it";
		  });
		
		$scope.debates = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.debates = {};
			$scope.countDebates = "";
			$scope.ancient = "";
			$http.post('/api/database/lords/debates',{"nameLord":$scope.LordNameDebates}).
			  success(function(data, status, headers, config) {
				$scope.debt = true;
				$scope.debates=data.results;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.mostTalkedDebate = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.debates = {};
			$scope.countDebates = "";
			$scope.ancient = "";
			$http.post('/api/database/lords/mostTalkedDebate',{"nameLord":$scope.LordNamemostTalkedDebate}).
			  success(function(data, status, headers, config) {
				$scope.mostTalkedDebate = data.results.theme;
				$scope.mostTalkedDebateN = data.results.count;
				$scope.mostTalkedDebateShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.countDebates = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.countDebates = "";
			$http.post('/api/database/lords/countDebates',{"nameLord":$scope.LordNameCountDebates}).
			  success(function(data, status, headers, config) {
				$scope.cdebt = true;
				$scope.cdebates=data.results[0].xpath;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.ancient = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.ancient = "";
			$http.post('/api/database/lords/oldest').
			  success(function(data, status, headers, config) {
				$scope.old = true;
				$scope.ancient=data.results[0].nome;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.countWord = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.nrWord = "";
			$http.post('/api/database/lords/countWord',{"nameLord" : $scope.LordNameCountWord,"word" : $scope.word}).
			  success(function(data, status, headers, config) {
				$scope.nword = true;
				$scope.nrWord=data.results[0].xpath;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.nWordApproved = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.WordsApprovedShow = false;
			$scope.nrWord = "";
			//var select = $scope.selectApproved.substr(0,$scope.selectApproved.length-4);
			$http.post('/api/database/lords/getManyTimesApproved',{"theme" : $scope.selectApproved,"word" : $scope.WordApproved}).
			  success(function(data, status, headers, config) {
				$scope.WordApprovedN = data.results[0].unnest;
				$scope.WordsApprovedShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.questionsTheme = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.WordsApprovedShow = false;
			$scope.nrWord = "";
			//var select = $scope.selectApproved.substr(0,$scope.selectApproved.length-4);
			$http.post('/api/database/lords/questions',{"nameLord" : $scope.nameLordQuestion,"theme" : $scope.questionTheme}).
			  success(function(data, status, headers, config) {
				$scope.questions = data.results;
				$scope.questionsShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.speechTheme = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.WordsApprovedShow = false;
			$scope.questionsShow = false;
			$scope.nrWord = "";
			//var select = $scope.selectApproved.substr(0,$scope.selectApproved.length-4);
			$http.post('/api/database/lords/speech',{"nameLord" : $scope.selectLord,"theme" : $scope.selectApproved2}).
			  success(function(data, status, headers, config) {
				$scope.nchars = data.results.speechSize;
				$scope.speech = data.results.speech;
				$scope.speechSize = true;
				$scope.speechShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.numberOfSessions = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.WordsApprovedShow = false;
			$scope.questionsShow = false;
			$scope.nrWord = "";
			//var select = $scope.selectApproved.substr(0,$scope.selectApproved.length-4);
			$http.post('/api/database/lords/numberOfSessions',{"theme" : $scope.selectApproved3}).
			  success(function(data, status, headers, config) {
				$scope.nSessions = data.results;
				$scope.nSessionsShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.lordApproved = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.WordsApprovedShow = false;
			$scope.questionsShow = false;
			$scope.nrWord = "";
			//var select = $scope.selectApproved.substr(0,$scope.selectApproved.length-4);
			$http.post('/api/database/lords/approvedMotions',{"nameLord" : $scope.nameLordApproved}).
			  success(function(data, status, headers, config) {
				$scope.nApproved = data.results;
				$scope.nApprovedShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.twoLords = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.WordsApprovedShow = false;
			$scope.questionsShow = false;
			$scope.nrWord = "";
			//var select = $scope.selectApproved.substr(0,$scope.selectApproved.length-4);
			$http.post('/api/database/lords/sameMotions',{"nameLord" : $scope.nameLord1,"nameLord2" : $scope.nameLord2}).
			  success(function(data, status, headers, config) {
				$scope.nTwoLords = data.results.count;
				$scope.mocoes = data.results.sameMotions;
				$scope.twoLordsShow = true;
				$scope.nTwoLordsShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.avgTime = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.WordsApprovedShow = false;
			$scope.questionsShow = false;
			$scope.nrWord = "";
			//var select = $scope.selectApproved.substr(0,$scope.selectApproved.length-4);
			$http.post('/api/database/lords/averageTime').
			  success(function(data, status, headers, config) {
				$scope.avg = data.results;
				$scope.avgShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
		$scope.lordType = function() {
			$scope.old = false;
			$scope.leftH = false;
			$scope.nword = false;
			$scope.mostTalkedDebatesShow = false;
			$scope.WordsApprovedShow = false;
			$scope.questionsShow = false;
			$scope.nrWord = "";
			//var select = $scope.selectApproved.substr(0,$scope.selectApproved.length-4);
			$http.post('/api/database/lords/getManyTimesType',{"nameLord" : $scope.nameLordType,"word" : $scope.wordType,"type" : $scope.selectDebate}).
			  success(function(data, status, headers, config) {
				$scope.nType = data.results[0].unnest;
				$scope.typeShow = true;
				}).
			  error(function(data, status, headers, config) {
				$scope.message = "Couldn't do it";
			  });
		}
		
	});
	
})();