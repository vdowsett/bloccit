const advertisementsQueries = require("../db/queries.advertisements.js");

module.exports = {
    
    index(req, res, next){
        advertisementsQueries.getAllAdvertisements((err, advertisements) => {
            if(err){
                res.redirect(500, "static/index");
            } else {
                res.render("advertisements/index", {advertisements});
                
            }
        });
    },

    new(req, res, next){
        res.render("advertisements/new");
    },
}