var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();


app.use(express.static(process.cwd() + '/public'));
//var mainjs = require("./public/assets/js/mainapp.js")

var exphbs = require('express-handlebars');

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/lineup_controller.js');
app.use('/', routes);

var port = process.env.PORT || 3000;
app.listen(port);
