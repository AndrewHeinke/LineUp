var mysql = require('mysql');

// jawsDB connection
var connection = mysql.createConnection({
	port: 3306,
	host: 'root',
	user: '#',
	password: '#',
	database: '#'
});

// local connection
// var connection = mysql.createConnection({
// 	port: 3306,
// 	host: 'localhost',
// 	user: 'root',
// 	password: '',
// 	database: 'db'
// });

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
