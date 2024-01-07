module.exports = app => {
    const addresss = require("../controllers/address.controller.js");
  
    var router = require("express").Router();
 
    // Create a new Customer
    router.post("/", addresss.create);
  
    // Retrieve all Customers
    router.get("/", addresss.findAll);
  
    // Retrieve all published Customers
    router.get("/published", addresss.findAllPublished);
  
    // Retrieve a single Customer with id
    router.get("/:id", addresss.findOne);
  
    // Update a Customer with id
    router.put("/:id", addresss.update);
  
    // Delete a Customer with id
    router.delete("/:id", addresss.delete);
  
    // Delete all Customers
    router.delete("/", addresss.deleteAll);
  
    app.use('/s/api/v1/address', router);
  };