module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
      truck_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      street_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      time_start: {
        type: DataTypes.STRING,
        allowNull: false
      },
      time_end: {
        type: DataTypes.STRING,
        allowNull: false
      },
      outdoor_seating: {
        type: DataTypes.BOOLEAN,
        isDefault: false
      },
      only_cc: {
        type: DataTypes.BOOLEAN,
        isDefault: false
      },
      only_cash: {
        type: DataTypes.BOOLEAN,
        isDefault: false
      }
    });

    Post.associate = models => {
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
      models.Post.belongsTo(models.Categories, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Post;
  };