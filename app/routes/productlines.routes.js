module.exports = app => {
    const productlines = require("../controllers/productlines.controller.js");
  
    var router = require("express").Router();
  
    // Create a new productline
    router.post("/", productlines.create);
  
    // Retrieve all productlines
    router.get("/", productlines.findAll);
  
    // Retrieve all published productlines
    router.get("/published", productlines.findAllPublished);
  
    // Retrieve a single productline with id
    router.get("/:id", productlines.findOne);
  
    // Update a productline with id
    router.put("/:id", productlines.update);
  
    // Delete a productline with id
    router.delete("/:id", productlines.delete);
  
    // Delete all productlines
    router.delete("/", productlines.deleteAll);
  
    app.use('/api/productlines', router);
  };