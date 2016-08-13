'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Locations', [{
        location_name: 'Faulk Library',
        latitude: 30.271201,
        longitude: -97.745699
    },
    {
        location_name: 'Carver Library',
        latitude: 30.269575,
        longitude: -97.724214
    },
    {
        location_name: 'Twin Oaks Library',
        latitude: 30.248623,
        longitude: -97.762353

      },
    {
        location_name: 'Epoch',
        latitude: 30.362217,
        longitude: -97.736252

      },
    {
        location_name: 'Norris',
        latitude: 30.355086,
        longitude: -97.733972

      }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Locations', null, {truncate: true});
  }
};
