const flairQueries = require("../db/queries.flairs.js");


module.exports = {

    index(req, res, next){
        flairQueries.getAllFlairs((err, flairs) => {
          if(err){
             res.redirect(500, "static/index");
           } else {
             res.render(
               "flairs/index", 
               { title: "Flairs",
                 flairs
                });
           }
         })
    },

    new(req, res, next){
        res.render("flairs/new");
    },

    create(req, res, next){
        let newFlair = {
          name: req.body.name,
          color: req.body.color
        };
        flairQueries.addFlair(newFlair, (err, flair) => {
          if(err){
            res.redirect(500, "/flairs/new");
          } else {
            res.redirect(303, `/flairs/${flair.id}`);
          }
        });
      }

}