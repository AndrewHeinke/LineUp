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
    return queryInterface.bulkInsert('LineVotes', [{
        line_length: 3,
        user_id: 'dude@fakemail.com',
        location_id: 1
    },
    {
        line_length: 2,
        user_id: 'wes@nomail.com',
        location_id: 1
    },
    {
        line_length: 2,
        user_id: 'jeff@whatmail.com',
        location_id: 1
    },
    {
        line_length: 1,
        user_id: 'dude@fakemail.com',
        location_id: 2
    },
    {
        line_length: 1,
        user_id: 'wes@nomail.com',
        location_id: 2
    },
    {
        line_length: 2,
        user_id: 'jeff@whatmail.com',
        location_id: 2
    },
    {
        line_length: 1,
        user_id: 'dude@fakemail.com',
        location_id: 3
    },
    {
        line_length: 1,
        user_id: 'wes@nomail.com',
        location_id: 3
    },
    {
        line_length: 2,
        user_id: 'jeff@whatmail.com',
        location_id: 3
      },
    {
        line_length: 1,
        user_id: 'dog1@yesmail.com',
        location_id: 4
      },
    {
        line_length: 1,
        user_id: 'dog2@yesmail.com',
        location_id: 4
      },
    {
        line_length: 1,
        user_id: 'dog3@yesmail.com',
        location_id: 4
      },
    {
        line_length: 1,
        user_id: 'dog4@yesmail.com',
        location_id: 5
      },
    {
        line_length: 1,
        user_id: 'dog5@yesmail.com',
        location_id: 5
      },
    {
        line_length: 1,
        user_id: 'dog6@yesmail.com',
        location_id: 5
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('LineVotes', null, {truncate: true});
  }
};
