var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://localhost:8000');
driver.findElement(By.id('wsUri')).sendKeys('test');
driver.findElement(By.id('connect')).click();
checkAlert();

function checkAlert() {
        var alert = driver.switchTo().alert();
        alert.sendKeys('testUser');
        alert.accept();
}
driver.findElement(By.id('msg')).sendKeys('test message');
driver.findElement(By.id('sendMsgWs')).click();
//driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//driver.quit();
