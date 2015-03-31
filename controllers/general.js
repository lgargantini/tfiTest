'use strict';

module.exports = function () {

var results = {};
var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

//SHOW ALERTS 
	function connectWs(driver, browser, i){
		driver.get('http://localhost:8000');
		driver.findElement(By.id('wsUri')).sendKeys('ws://localhost:8000');
		driver.findElement(By.id('connect')).click();
		checkAlert(driver, browser ,i);
	}

	function connectHttp (driver) {
		driver.get('http://localhost:8000');
		driver.findElement(By.id('getMsg')).sendKeys(1000);
	}

	function runTest1 (tec, number, driver, browser, res) {
		
		console.log('entro a TestOne');
		for(var i=0; i< number;i++){
			if(tec == 'ws'){
				connectWs(driver, browser, i);
				driver.findElement(By.id('msg')).sendKeys('test message ws'+i);
				driver.findElement(By.id('sendMsgWs')).click();
			}else{
				connectHttp(driver);
				driver.findElement(By.id('msgAjax')).sendKeys('test message http'+i);
				driver.findElement(By.id('sendMsgAjax')).click();
				checkAlert(driver, browser, i);
			}
		}
		//return results;
	}



	function runTest2 (tec, number, driver, browser, res) {
		console.log('entro a TestTwo');
		for(var i=0; i< number;i++){
			if(tec == 'ws'){
				connectWs(driver, browser,i);
				driver.findElement(By.id('FileBox')).sendKeys('/home/ing/Descargas/Falling.Skies.S04E04.HDTV.x264-KILLERS.mp4');
			  	driver.findElement(By.id('UploadButtonWs')).click();
			}else{
				connectHttp(driver);
				driver.findElement(By.id('UploadFileHttp')).sendKeys('/home/ing/Descargas/Falling.Skies.S04E04.HDTV.x264-KILLERS.mp4');
				driver.findElement(By.id('UploadButtonHttp')).click();
			}
		}
	}

	function runTest3 (tec, number, driver, browser, res) {
		
		for(var i=0; i< number;i++){
			if(tec == 'ws'){
		  		connectWs(driver,browser, i);
		  		driver.findElement(By.id('enableCursorWs')).click();
		  		//start random movements
		  		//driver.findElement(By.id('disableCursorWs')).click();
			}else{
				connectHttp(driver);
				driver.findElement(By.id('enableCursorAjax')).click();
				randomizeMovements(driver);
				
				//driver.findElement(By.id('enableCursorAjax')).mouseMove( driver.findElement(By.id('msgAjax'));
				//driver.findElement(By.id('enableCursorAjax')).mouseMove(driver.findElement(By.id('UploadFileHttp'));
				//driver.findElement(By.id('enableCursorAjax')).mouseMove(driver.findElement(By.id('getMsg'));
				//driver.findElement(By.id('disableCursorAjax')).click();
			}
		}

		return results;
	}

	function randomizeMovements (driver) {
		for(var i=0;i<5;i++){
			new webdriver.ActionSequence(driver).
					    mouseMove({x:getRandomArbitrary(0,100),y:getRandomArbitrary(0,100)});
		}
	}

	function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}


	function checkAlert(driver, browser, i) {
	  if(browser == 'phantom'){
	    driver.onPrompt = function  (msg, defaultVl) {
	      return "test";
	    }
	  }else{
	    var alert = driver.switchTo().alert();
	    alert.sendKeys('testUser'+i);
	    alert.accept();
	  }

	}

var gen = {
	
	test: function (req,res,next) {
	
		var tec = req.params.tec;
		var test = req.params.test;
		var browser = req.params.browser ?
					req.params.browser :
					'chrome';
		var number = req.params.number ?
					req.params.number :
					5;
		var driver = new webdriver.Builder()
					    .forBrowser(browser)
					    .build();
		switch(test){
			case 'test1':
				runTest1(tec, number, driver, browser, res);
				break;
			case 'test2':
				runTest2(tec, number, driver, browser, res);
				break;
			case 'test3':
				runTest3(tec, number, driver, browser, res);
				break;
			default:
				res.send('Nombre de test erroneo');
				break;
		}
		
		res.end("Test ejecutado\n" + 
			'Tecnologia :'+tec+'->'+test+'\n'+
			'Driver :'+browser+'->'+'Users :'+number);

	},
	index:function (req,res,next) {
		res.render('index');
	}

};	
return gen;
};