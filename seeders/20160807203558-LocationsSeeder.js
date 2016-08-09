'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
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
        
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    return queryInterface.bulkDelete('Locations', null, {});
  }
};
