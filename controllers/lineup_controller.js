var express = require('express');
var router = express();
var models = require('../models');
var method = require('method-override');
var bodyParser = require('body-parser');
var q = require('q');

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
	var locFinal = [];
	models.Locations.findAll()
	.then(function(data){
		for (i = 0; i < data.length; i++){
			locFinal.push(grabVotes(data[i].dataValues));
		}
		q.all(locFinal).then(function(locations){
			res.json(locations);
		})
	})

	var grabVotes = function (location){
		return models.LineVotes.findAll({
			where: {
				location_id: location.id
			}
		}).then(function(votes){
			//console.log(location);
			var sum = 0;
			for (j = 0; j < votes.length; j++){
				sum += votes[j].line_length; 
			}
			//console.log(sum);
			location.line_length = Math.round(sum/votes.length);
			console.log(location);
			return location;
		});
	}

});

module.exports = router;
