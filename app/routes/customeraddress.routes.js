module.exports = app => {
    const customeraddress = require("../controllers/customeraddress.controller.js");
  
    var router = require("express").Router();
 
    // Create a new Customer
    router.post("/", customeraddress.create);
  
    // Retrieve all Customers
    router.get("/", customeraddress.findAll);
  
    // Retrieve all published Customers
    router.get("/published", customeraddress.findAllPublished);
  
    // Retrieve a single Customer with id
    router.get("/:id", customeraddress.findOne);
  
    // Update a Customer with id
    router.put("/:id", customeraddress.update);
  
    // Delete a Customer with id
    router.delete("/:id", customeraddress.delete);
  
    // Delete all Customers
    router.delete("/", customeraddress.deleteAll);
  
    app.use('/s/api/v1/customeraddress', router);
  };