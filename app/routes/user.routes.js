module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/", user.create);
  
    // Retrieve all user
    router.get("/", user.findAll);
  
    // Retrieve all published user
    router.get("/published", user.findAllPublished);
  
    // Retrieve a single user with id
    router.get("/:id", user.findOne);
  
    // Update a user with id
    router.put("/:id", user.update);
  
    // Delete a user with id
    router.delete("/:id", user.delete);
  
    // Delete all user
    router.delete("/", user.deleteAll);
  
    app.use('/s/api/v1/user', router);
  };