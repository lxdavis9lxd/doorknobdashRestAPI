module.exports = app => {
    const deliverdriver = require("../controllers/deliverdriver.controller.js");
  
    var router = require("express").Router();
  
    // Create a new orderdetail
    router.post("/", deliverdriver.create);
  
    // Retrieve all deliverdriver
    router.get("/", deliverdriver.findAll);
  
    // Retrieve all published deliverdriver
    router.get("/published", deliverdriver.findAllPublished);
  
    // Retrieve a single orderdetail with id
    router.get("/:id", deliverdriver.findOne);
  
    // Update a orderdetail with id
    router.put("/:id", deliverdriver.update);
  
    // Delete a orderdetail with id
    router.delete("/:id", deliverdriver.delete);
  
    // Delete all deliverdriver
    router.delete("/", deliverdriver.deleteAll);
  
    app.use('/s/api/v1/deliverdriver', router);
  };