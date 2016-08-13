'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Locations', [{
        location_name: 'Faulk Library',
        latitude: 30.271201,
        longitude: -97.745699,
        image: "https://9968c6ef49dc043599a5-e151928c3d69a5a4a2d07a8bf3efa90a.ssl.cf2.rackcdn.com/66975-4.jpg"
    },
    {
        location_name: 'Carver Library',
        latitude: 30.269575,
        longitude: -97.724214,
        image: "http://library.austintexas.gov/sites/default/files/acb.jpg"
    },
    {
        location_name: 'Twin Oaks Library',
        latitude: 30.248623,
        longitude: -97.762353,
        image: "http://www.austinone.com/c/images/hp-04.jpg"

      },
    {
        location_name: 'Epoch',
        latitude: 30.362217,
        longitude: -97.736252,
        image: "https://workfrom-workfrominc.netdna-ssl.com/wp-content/uploads/2014/09/epoch13-612x870.jpg"

      },
    {
        location_name: 'Norris',
        latitude: 30.355086,
        longitude: -97.733972,
        image: "http://norriscenters.com/wp-content/uploads/2015/10/Austin-1.jpg"

      }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Locations', null, {truncate: true});
  }
};
