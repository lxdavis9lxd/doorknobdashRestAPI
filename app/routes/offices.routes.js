module.exports = app => {
    const offices = require("../controllers/offices.controller.js");
  
    var router = require("express").Router();
  
    // Create a new office
    router.post("/", offices.create);
  
    // Retrieve all offices
    router.get("/", offices.findAll);
  
    // Retrieve all published offices
    router.get("/published", offices.findAllPublished);
  
    // Retrieve a single office with id
    router.get("/:id", offices.findOne);
  
    // Update a office with id
    router.put("/:id", offices.update);
  
    // Delete a office with id
    router.delete("/:id", offices.delete);
  
    // Delete all offices
    router.delete("/", offices.deleteAll);
  
    app.use('/api/v1/offices', router);
  };