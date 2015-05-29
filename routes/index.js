module.exports= function (app,controller) {
app.get('/:tec/:test',controller.general.test);
app.get('/:tec/:test/:number',controller.general.test);
app.get('/:tec/:test/:driver/:number', controller.general.test);
app.get('/',controller.general.index);
}