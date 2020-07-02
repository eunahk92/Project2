const db = require("../models");

module.exports = function(app) {
    app.get("/api/categories", (req, res) => {
        db.categories.findAll({}).then(dbCategories => {
            console.log(dbCategories);
            res.json(dbCategories);
        });
    });
}