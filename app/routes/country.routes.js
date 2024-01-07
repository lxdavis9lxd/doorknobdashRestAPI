module.exports = app => {
    const country = require("../controllers/country.controller.js");
  
    var router = require("express").Router();
  
    // Create a new employee
    router.post("/", country.create);
  
    // Retrieve all country
    router.get("/", country.findAll);
  
    // Retrieve all published country
    router.get("/published", country.findAllPublished);
  
    // Retrieve a single employee with id
    router.get("/:id", country.findOne);
  
    // Update a employee with id
    router.put("/:id", country.update);
  
    // Delete a employee with id
    router.delete("/:id", country.delete);
  
    // Delete all country
    router.delete("/", country.deleteAll);
  
    app.use('/s/api/v1/country', router);
  };