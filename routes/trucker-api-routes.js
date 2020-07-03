/* eslint-disable camelcase */
const db = require("../models");

module.exports = function(app) {
  app.get("/api/categories", (req, res) => {
    db.categories
      .findAll({
        order: [["food_type", "ASC"]]
      })
      .then(dbCategories => res.json(dbCategories));
  });

  app.get("/api/foodtrucks", (req, res) => {
    db.truckers.findAll({}).then(dbTruckers => {
      console.log(dbTruckers);
      res.json(dbTruckers);
    });
  });

  app.get("/api/categories/:categoryid", (req, res) => {
    db.truckers
      .findAll({
        where: {
          food_type: req.params.categoryid
        }
      })
      .then(dbTruckers => {
        res.render("blog", { post: dbTruckers });
      });
  });

  app.post("/api/foodtrucks", (req, res) => {
    db.truckers.create(req.body).then(dbTruckers => res.json(dbTruckers));
  });
};
