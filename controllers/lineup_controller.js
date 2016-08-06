var express = require('express');
var router = express.Router();
var burger = require('../models/index.js');
var method = require('method-override');
var bodyParser = require('body-parser');

router.get('/', function(req, res) {
  res.redirect('/lineup');
});

router.get('/lineup', function(req, res) {
  models.burgers.findAll()
    .then(function(data) {
      res.render('index', {
        burgers: data
      });
    });
});

router.post('/lineup/create', function(req, res) {
  models.burgers.create({
      burger_name: req.body.name,
      devoured: 0
    })
    .then(function(data) {
      res.redirect('/lineup');
    });
});

router.put('/lineup/update/:id', function(req, res) {
  var burgerID = req.params.id;
  models.burgers.update({
      devoured: true
    }, {
      where: {
        id: burgerID
      }
    })
    .then(function(data) {
      res.redirect('/burgers');
    });
});

module.exports = router;
