var PORT = process.env.PORT || 3232;
var data = require('./data');
var express = require('express'),
		exphbs = require('express-handlebars');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.get('*', function (request, response) {
  response.render('index', { data: data });
});

app.listen(PORT, function () {
	console.log('server running on port', PORT);
});