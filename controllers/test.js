var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var browser;

process.on('message', function (m) {
  console.log('Child got');
  console.log(m);
  browser = m.browser;
  var quantity = m.quantity;
  var driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();

  for(var i=0; i< quantity;i++){
    testOne(i,browser,driver);
  }
  //process.send({range:m,resultList: list});
  process.exit();
});

function testOne(i,browser,driver){
  
  console.log('entro a TestOne');
 // console.log(driver);
  driver.get('http://localhost:8000');
  driver.findElement(By.id('wsUri')).sendKeys('ws://localhost:8000');
  driver.findElement(By.id('connect')).click();
  checkAlert(driver,i);
  driver.findElement(By.id('msg')).sendKeys('test message'+i);
  driver.findElement(By.id('sendMsgWs')).click();
}


function checkAlert(driver,i) {
  if(driver == 'phantom'){
    driver.onPrompt = function  (msg, defaultVl) {
      return "test";
    }
  }else{
    var alert = driver.switchTo().alert();
    alert.sendKeys('testUser'+i);
    alert.accept();
  }

}
//driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//driver.quit();
