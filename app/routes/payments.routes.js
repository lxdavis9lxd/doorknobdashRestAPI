module.exports = app => {
    const payments = require("../controllers/payments.controller.js");
  
    var router = require("express").Router();
  
    // Create a new payment
    router.post("/", payments.create);
  
    // Retrieve all payments
    router.get("/", payments.findAll);
  
    // Retrieve all published payments
    router.get("/published", payments.findAllPublished);
  
    // Retrieve a single payment with id
    router.get("/:id", payments.findOne);
  
    // Update a payment with id
    router.put("/:id", payments.update);
  
    // Delete a payment with id
    router.delete("/:id", payments.delete);
  
    // Delete all payments
    router.delete("/", payments.deleteAll);
  
    app.use('/s/api/v1/payments', router);
  };