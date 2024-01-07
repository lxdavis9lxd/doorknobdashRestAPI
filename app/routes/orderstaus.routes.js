module.exports = app => {
    const orderstatus = require("../controllers/orderstatus.controller.js");
  
    var router = require("express").Router();
  
    // Create a new product
    router.post("/", orderstatus.create);
  
    // Retrieve all orderstatus
    router.get("/", orderstatus.findAll);
  
    // Retrieve all published orderstatus
    router.get("/published", orderstatus.findAllPublished);
  
    // Retrieve a single product with id
    router.get("/:id", orderstatus.findOne);
  
    // Update a product with id
    router.put("/:id", orderstatus.update);
  
    // Delete a product with id
    router.delete("/:id", orderstatus.delete);
  
    // Delete all orderstatus
    router.delete("/", orderstatus.deleteAll);
  
    app.use('/s/api/v1/orderstatus', router);
  };