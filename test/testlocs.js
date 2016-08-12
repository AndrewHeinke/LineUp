var should = require('chai').should(),
 locationtest =  require('./locationtest.js');

var q = require('q');
var models = require('../app/models');

console.log(locationtest);

locationtest();


var allLocs = [ { id: 1,
    location_name: 'Faulk Library',
    latitude: 30.2712,
    longitude: -97.7457,
    createdAt: 'Wed Aug 10 2016 21:15:17 GMT-0500 (Central Daylight Time)',
    updatedAt: 'Wed Aug 10 2016 21:15:17 GMT-0500 (Central Daylight Time)',
    line_length: NaN },
  { id: 2,
    location_name: 'Carver Library',
    latitude: 30.2696,
    longitude: -97.7242,
    createdAt: 'Wed Aug 10 2016 21:15:17 GMT-0500 (Central Daylight Time)',
    updatedAt: 'Wed Aug 10 2016 21:15:17 GMT-0500 (Central Daylight Time)',
    line_length: NaN },
  { id: 3,
    location_name: 'Twin Oaks Library',
    latitude: 30.2486,
    longitude: -97.7624,
    createdAt:'Wed Aug 10 2016 21:15:17 GMT-0500 (Central Daylight Time)',
    updatedAt: 'Wed Aug 10 2016 21:15:17 GMT-0500 (Central Daylight Time)',
    line_length: NaN } ]


  // describe('locationtest', function(){
  //   it('Should return locations', function(){
  //     locationtest().should.equal(allLocs);
  //   })
  // });
