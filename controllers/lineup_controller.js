var express = require('express');
var router = express.Router();
var models = require('../models');
var method = require('method-override');
var bodyParser = require('body-parser');

router.get('/', function(req, res) {
	models.Locations.findAll()
	.then(function(data){
		var allLocations = {locations: data};
		console.log(allLocations);
		res.render('index', allLocations);
	});
});


router.post('/line/newvote', function(req, res){
	models.LineVotes.create({
		line_length: req.body.line_length,
		user_id: req.body.user_id,
		location_id: req.body.location_id
	})
});

router.post('/party/create', function(req, res){
	//route to add party affiliation
});

router.get('/location/:id', function(req, res){
	//get for location info
})

router.get('/locations', function(req, res){
	models.Locations.findAll()
	.then(function(locations){
		res.json(locations);
	});
});


module.exports = router;
