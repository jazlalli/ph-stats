var fs = require('fs');
var baseDir = 'data/'
var data = {};

var files = fs.readdirSync(baseDir);

files.forEach(function (file) {
	var nameparts = file.split('.');

	if (nameparts[1] === 'json') {
		data[nameparts[0]] = require('./' + file).stats;
	}
})

module.exports = data;