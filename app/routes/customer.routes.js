module.exports = app => {
    const customer = require("../controllers/customer.controller.js");
  
    var router = require("express").Router();
  
    // Create a new office
    router.post("/", customer.create);
  
    // Retrieve all customer
    router.get("/", customer.findAll);
  
    // Retrieve all published customer
    router.get("/published", customer.findAllPublished);
  
    // Retrieve a single office with id
    router.get("/:id", customer.findOne);
  
    // Update a office with id
    router.put("/:id", customer.update);
  
    // Delete a office with id
    router.delete("/:id", customer.delete);
  
    // Delete all customer
    router.delete("/", customer.deleteAll);
  
    app.use('/s/api/v1/customer', router);
  };