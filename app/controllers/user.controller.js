const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const validatekey  = require("./validator.js");

// Create and Save a new user
exports.create = (req, res) => {
  const apiKey = req.headers['api-key'];
  const isvalidkey = validatekey.validateApiKey(apiKey)
  if (isvalidkey.status == 401) {  
    console.log("Unauthorized",apiKey);
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }
  // Validate request
 console.log("log",req.body)
  if (!req.body.Data[0].Customernumber) {
    res.status(400).send({
      message: "Content can not be empty!"
      
    });
    return;
  }
  // Create User
  const user = req.body.Data.map(data => ({
    ID: data.ID,
    UserName: data.UserName,
    Email: data.Email,
    Salt: data.Salt,
    Createat: data.Createat,
    UpDatesat: data.UpDatesat,
    CreatedBy: data.CreatedBy,
    ModifiedBy: data.ModifiedBy,
    Key: data.Key,
    Role: data.Role
  }));

  // Save user in the database
  User.bulkCreate(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
 
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
       // Read API key from header
  const apiKey = req.headers['api-key'];
  // Compare API key
  const isvalidkey = validatekey.validateApiKey(apiKey)

  if (isvalidkey.status == 401) {  
    console.log("Unauthorized",apiKey);
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    console.log("condition: " + condition);
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User."
        });
      });
};


// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
       // Read API key from header
  const apiKey = req.headers['api-key'];

  const isvalidkey = validatekey.validateApiKey(apiKey)
  if (isvalidkey.status == 401) {  
    console.log("Unauthorized",apiKey);
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
};

// Update a User by the id in the request
exports.update = (req, res) => {
      // Read API key from header
      const apiKey = req.headers['api-key'];

      const isvalidkey = validatekey.validateApiKey(apiKey)
  if (isvalidkey.status == 401) {  
    console.log("Unauthorized",apiKey);
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }
    const id = req.params.id;

    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
      // Read API key from header
      const apiKey = req.headers['api-key'];

      const isvalidkey = validatekey.validateApiKey(apiKey)
      if (isvalidkey.status == 401) {  
        console.log("Unauthorized",apiKey);
          res.status(401).send({
            message: "Unauthorized"
          });
          return;
        }
    const id = req.params.id;

    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
      // Read API key from header
      const apiKey = req.headers['api-key'];

      const isvalidkey = validatekey.validateApiKey(apiKey)
  if (isvalidkey.status == 401) {  
    console.log("Unauthorized",apiKey);
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }
    User.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} User were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all User."
          });
        });
};

// Find all published User
exports.findAllPublished = (req, res) => {
      // Read API key from header
      const apiKey = req.headers['api-key'];

      const isvalidkey = validatekey.validateApiKey(apiKey)
  if (isvalidkey.status == 401) {  
    console.log("Unauthorized",apiKey);
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }
    User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    });
};