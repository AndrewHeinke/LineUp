'use strict';
module.exports = function(sequelize, DataTypes) {
  var Locations = sequelize.define('Locations', {
    location_name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Locations;
};
