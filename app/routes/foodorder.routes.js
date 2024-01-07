module.exports = app => {
    const foodorder = require("../controllers/foodorder.controller.js");
  
    var router = require("express").Router();
  
    // Create a new order
    router.post("/", foodorder.create);
  
    // Retrieve all foodorder
    router.get("/", foodorder.findAll);
  
    // Retrieve all published foodorder
    router.get("/published", foodorder.findAllPublished);
  
    // Retrieve a single order with id
    router.get("/:id", foodorder.findOne);
  
    // Update a order with id
    router.put("/:id", foodorder.update);
  
    // Delete a order with id
    router.delete("/:id", foodorder.delete);
  
    // Delete all foodorder
    router.delete("/", foodorder.deleteAll);
  
    app.use('/s/api/v1/foodorder', router);
  };