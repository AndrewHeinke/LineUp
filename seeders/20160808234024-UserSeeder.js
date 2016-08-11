'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
        email: 'dude@fakemail.com',
        password: 'mykewlpassword',
    },
    {
        email: 'wes@nomail.com',
        password: 'hahahadude',
        hasVoted: true,
    },
    {
        email: 'jeff@whatmail.com',
        password: 'yobruh',

      }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
