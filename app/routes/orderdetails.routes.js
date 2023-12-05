module.exports = app => {
    const orderdetails = require("../controllers/orderdetails.controller.js");
  
    var router = require("express").Router();
  
    // Create a new orderdetail
    router.post("/", orderdetails.create);
  
    // Retrieve all orderdetails
    router.get("/", orderdetails.findAll);
  
    // Retrieve all published orderdetails
    router.get("/published", orderdetails.findAllPublished);
  
    // Retrieve a single orderdetail with id
    router.get("/:id", orderdetails.findOne);
  
    // Update a orderdetail with id
    router.put("/:id", orderdetails.update);
  
    // Delete a orderdetail with id
    router.delete("/:id", orderdetails.delete);
  
    // Delete all orderdetails
    router.delete("/", orderdetails.deleteAll);
  
    app.use('/s/api/v1/orderdetails', router);
  };