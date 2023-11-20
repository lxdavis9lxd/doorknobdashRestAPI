module.exports = app => {
    const SPKusers = require("../controllers/SPKusers.controller.js");
  
    var router = require("express").Router();
  
    // Create a new SPKuser
    router.post("/", SPKusers.create);
  
    // Retrieve all SPKusers
    router.get("/", SPKusers.findAll);
  
    // Retrieve all published SPKusers
    router.get("/published", SPKusers.findAllPublished);
  
    // Retrieve a single SPKuser with id
    router.get("/:id", SPKusers.findOne);
  
    // Update a SPKuser with id
    router.put("/:id", SPKusers.update);
  
    // Delete a SPKuser with id
    router.delete("/:id", SPKusers.delete);
  
    // Delete all SPKusers
    router.delete("/", SPKusers.deleteAll);
  
    app.use('/api/SPKusers', router);
  };