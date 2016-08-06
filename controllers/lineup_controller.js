var express = require('express');
var router = express.Router();
var burger = require('../models/index.js');
var method = require('method-override');
var bodyParser = require('body-parser');

router.get('/', function(req, res) {
  res.render('index');
});


router.post('/line/newvote', function(req, res){
	//route to post votes
}

router.post('/party/create', function(req, res){
	//route to add party affiliation
}

router.get('/location/:id', function(req, res){
	//get for location info
}


module.exports = router;
