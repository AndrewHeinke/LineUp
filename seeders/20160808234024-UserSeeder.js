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
    return queryInterface.bulkDelete('Users', null, {truncate: true});
  }
};
