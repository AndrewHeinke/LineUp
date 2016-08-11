// app/routes.js
module.exports = function(app, passport) {
	var q = require('q');
	var models = require('./models');
  app.get('/', function(req, res) {
    models.Locations.findAll()
      .then(function(data) {
        var allLocations = {
          locations: data
        };
        console.log(allLocations);
        res.render('index', allLocations);
      });
  });

  app.post('/line/newvote', function(req, res) {
    models.LineVotes.create({
      line_length: req.body.line_length,
      user_id: req.body.user_id,
      location_id: req.body.location_id
    });
  });

  app.post('/party/create', function(req, res) {
    //route to add party affiliation
  });

  app.get('/location/:id', function(req, res) {
    //get for location info
  });

  app.get('/locations', function(req, res) {
    var locFinal = [];
    models.Locations.findAll()
      .then(function(data) {
        for (i = 0; i < data.length; i++) {
          locFinal.push(grabVotes(data[i].dataValues));
        }
        q.all(locFinal).then(function(locations) {
          res.json(locations);
        });
      });

    var grabVotes = function(location) {
      return models.LineVotes.findAll({
        where: {
          location_id: location.id
        }
      }).then(function(votes) {
        //console.log(location);
        var sum = 0;
        for (j = 0; j < votes.length; j++) {
          sum += votes[j].line_length;
        }
        //console.log(sum);
        location.line_length = Math.round(sum / votes.length);
        console.log(location);
        return location;
      });
    };
  });

  // new stuff from master is above this line

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }),
    function(req, res) {
      console.log("hello");
      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect('/');
    });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // PROFILE SECTION =========================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
      user: req.user // get the user out of session and pass to template
    });
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
