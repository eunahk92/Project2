module.exports = function(sequelize, DataTypes) {
  const Categories = sequelize.define("categories", {
    // eslint-disable-next-line camelcase
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
