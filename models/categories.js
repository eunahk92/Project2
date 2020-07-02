module.exports = function(sequelize, DataTypes) {
    let Categories = sequelize.define("categories", {
      food_type: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            len: [1]
        }
      }
    });
    return Categories;
  };