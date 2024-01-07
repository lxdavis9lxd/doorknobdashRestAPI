module.exports = app => {
    const restaurant = require("../controllers/restaurant.controller.js");
  
    var router = require("express").Router();
  
    // Create a new SPKuser
    router.post("/", restaurant.create);
  
    // Retrieve all restaurant
    router.get("/", restaurant.findAll);
  
    // Retrieve all published restaurant
    router.get("/published", restaurant.findAllPublished);
  
    // Retrieve a single SPKuser with id
    router.get("/:id", restaurant.findOne);
  
    // Update a SPKuser with id
    router.put("/:id", restaurant.update);
  
    // Delete a SPKuser with id
    router.delete("/:id", restaurant.delete);
  
    // Delete all restaurant
    router.delete("/", restaurant.deleteAll);
  
    app.use('/s/api/v1/restaurant', router);
  };