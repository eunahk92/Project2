module.exports = function(sequelize, DataTypes) {
  const FoodCategories = sequelize.define("food_categories", {
    food_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return FoodCategories;
};