var PORT = process.env.PORT || 3232;

var express = require('express'),
		exphbs = require('express-handlebars');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.enable('view cache');
app.use(express.static(__dirname + '/public'));

app.get('*', function (request, response) {
  response.render('index', { stats: 1 });
});

app.listen(PORT, function () {
	console.log('server running on port', PORT);
});