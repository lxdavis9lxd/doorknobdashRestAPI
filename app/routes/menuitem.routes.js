module.exports = app => {
    const menuitem = require("../controllers/menuitem.controller.js");
  
    var router = require("express").Router();
  
    // Create a new payment
    router.post("/", menuitem.create);
  
    // Retrieve all menuitem
    router.get("/", menuitem.findAll);
  
    // Retrieve all published menuitem
    router.get("/published", menuitem.findAllPublished);
  
    // Retrieve a single payment with id
    router.get("/:id", menuitem.findOne);
  
    // Update a payment with id
    router.put("/:id", menuitem.update);
  
    // Delete a payment with id
    router.delete("/:id", menuitem.delete);
  
    // Delete all menuitem
    router.delete("/", menuitem.deleteAll);
  
    app.use('/s/api/v1/menuitem', router);
  };