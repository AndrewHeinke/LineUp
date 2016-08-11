'use strict';
module.exports = function(sequelize, DataTypes) {
  var LineVotes = sequelize.define('LineVotes', {
    line_length: DataTypes.INTEGER,
    user_id: DataTypes.STRING,
    location_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return LineVotes;
};
