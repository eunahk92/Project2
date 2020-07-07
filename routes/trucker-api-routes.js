const db = require("../models");
const moment = require("moment");

module.exports = async function(app) {
    try {
        app.get("/api/categories", (req, res) => {
            db.categories.findAll({
                order: [
                    ['food_type', 'ASC']
                ],
            }).then(dbCategories => res.json(dbCategories));
        });
    
        app.get("/api/foodtrucks", (req, res) => {
            db.truckers.findAll({}).then(dbTruckers => res.json(dbTruckers));
        });
    
        app.get("/api/posts/categories/:categoryid", (req, res) => {
            db.truckers.findAll({
                where: {
                    food_type: req.params.categoryid
                }
            }).then(dbTruckers => {
                console.log(dbTruckers);
                for (let i = 0; i < dbTruckers.length; i++) {
                    startTime = dbTruckers[i].time_start;
                    endTime = dbTruckers[i].time_end;
                    dbTruckers[i].time_start = moment(startTime).format('hh:mm a');
                    dbTruckers[i].time_end = moment(endTime).format('hh:mm a');
                }
                res.render("blog", { post: dbTruckers })
            });   
        });
        
    
        app.post("/api/foodtrucks", (req, res) => {
            db.truckers.create(req.body).then(dbTruckers => res.json(dbTruckers));
        });
    } catch (err) { console.log(err) }
    

}