var express = require('express');
var router = express.Router();
var burger = require('../models/index.js');
var method = require('method-override');
var bodyParser = require('body-parser');

router.get('/', function(req, res) {
  res.render('index');
});


module.exports = router;
