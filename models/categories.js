module.exports = function(sequelize, DataTypes) {
    let Categories = sequelize.define("Categories", {
      food_type: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            len: [1]
        }
      }
    });

    Categories.sync({force: true}).then(() => {
      Categories.create({
        food_type: "Asian"
      });
      Categories.create({
        food_type: "American"
      });
      Categories.create({
        food_type: "Mexican"
      });
      Categories.create({
        food_type: "Dessert"
      });
      Categories.create({
        food_type: "Vegetarian/Vegan"
      });
    });

    return Categories;
  };