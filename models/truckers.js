module.exports = function(sequelize, DataTypes) {
  const Trucker = sequelize.define("truckers", {
    trucker_name: {
      type: DataTypes.TIME,
      allowNull: false
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    food_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time_start: {
      type: DataTypes.TIME,
      allowNull: false
    },
    time_end: {
      type: DataTypes.TIME,
      allowNull: false
    }
  });
  return Trucker;
};
