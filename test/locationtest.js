
  var q = require('q');
  var should = require('chai').should();
  var models = require('../app/models');

  var grabLocs = function (){
    var locFinal = [];
    models.Locations.findAll()
      .then(function(data) {
        var currTime = new Date();
        console.log(currTime);
        currTime.setHours(currTime.getHours() - 1);
        for (i = 0; i < data.length; i++) {
          locFinal.push(grabVotes(data[i].dataValues, currTime));
        }
        q.all(locFinal).then(function(locations) {
          return locations;
        });
      })};

    var grabVotes = function(location, date) {
      return models.LineVotes.findAll({
        where: {
          location_id: location.id,
          createdAt:{
            $gte: date
          }
        }
      }).then(function(votes) {
        var sum = 0;
        for (j = 0; j < votes.length; j++) {
          sum += votes[j].line_length;
        }
        location.line_length = Math.round(sum / votes.length);
        console.log(location);
        return location;
      });
    };

    module.exports = grabLocs;

// grabLocs();

// allLocs = [ { id: 1,
//     location_name: 'Faulk Library',
//     latitude: 30.2712,
//     longitude: -97.7457,
//     createdAt: 'Wed Aug 10 2016 21:15:17 GMT-0500 (Central Daylight Time)',
//     updatedAt: 'Wed Aug 10 2016 21:15:17 GMT-0500 (Central Daylight Time)',
//     line_length: NaN },
//   { id: 2,
//     location_name: 'Carver Library',
//     latitude: 30.2696,
//     longitude: -97.7242,
//     createdAt: 'Wed Aug 10 2016 21:15:17 GMT-0500 (Central Daylight Time)',
//     updatedAt: 'Wed Aug 10 2016 21:15:17 GMT-0500 (Central Daylight Time)',
//     line_length: NaN },
//   { id: 3,
//     location_name: 'Twin Oaks Library',
//     latitude: 30.2486,
//     longitude: -97.7624,
//     createdAt:'Wed Aug 10 2016 21:15:17 GMT-0500 (Central Daylight Time)',
//     updatedAt: 'Wed Aug 10 2016 21:15:17 GMT-0500 (Central Daylight Time)',
//     line_length: NaN } ]


//   describe('grabLocs', function(){
//     it('Should return locations', function(){
//       grabLocs().should.equal(allLocs);
//     })
//   });

