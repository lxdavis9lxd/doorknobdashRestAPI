module.exports = app => {
    const ordermenuitem = require("../controllers/ordermenuitem.controller.js");
  
    var router = require("express").Router();
  
    // Create a new productline
    router.post("/", ordermenuitem.create);
  
    // Retrieve all ordermenuitem
    router.get("/", ordermenuitem.findAll);
  
    // Retrieve all published ordermenuitem
    router.get("/published", ordermenuitem.findAllPublished);
  
    // Retrieve a single productline with id
    router.get("/:id", ordermenuitem.findOne);
  
    // Update a productline with id
    router.put("/:id", ordermenuitem.update);
  
    // Delete a productline with id
    router.delete("/:id", ordermenuitem.delete);
  
    // Delete all ordermenuitem
    router.delete("/", ordermenuitem.deleteAll);
  
    app.use('/s/api/v1/ordermenuitem', router);
  };