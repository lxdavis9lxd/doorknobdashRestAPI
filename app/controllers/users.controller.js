const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const validatekey = require("../controllers/validator.js");

// Create and Save a new Users
exports.create = (req, res) => {
  const apiKey = req.headers['api-key'];
  const isvalidkey = validatekey.validateApiKey(apiKey);
  if (isvalidkey.status == 401) {
    console.log("Unauthorized", apiKey);
    res.status(401).send({
      message: "Unauthorized"
    });
    return;
  }
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Users
  const Users = req.body.Data.map(data => ({
    "UserName": data.UserName,
    "Pword": data.Pword,
    "Userrole": data.Userrole,
    "Employeenumber": data.Employeenumber,

  }));

  // Save Users in the database
  Users.create(Users)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Users."
      });
    });

};


// Retrieve all Userss from the database.
exports.findAll = (req, res) => {
  const apiKey = req.headers['api-key'];
  const isvalidkey = validatekey.validateApiKey(apiKey);
  if (isvalidkey.status == 401) {
    console.log("Unauthorized", apiKey);
    res.status(401).send({
      message: "Unauthorized"
    });
    return;
  }

  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Users.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Userss."
      });
    });
};

// Find a single Users with an id
exports.findOne = (req, res) => {
  const apiKey = req.headers['api-key'];
  const isvalidkey = validatekey.validateApiKey(apiKey);
  if (isvalidkey.status == 401) {
    console.log("Unauthorized", apiKey);
    res.status(401).send({
      message: "Unauthorized"
    });
    return;
  }

  const id = req.params.id;

  Users.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Users with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Users with id=" + id
      });
    });
};

// Update a Users by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
 // Compare API key
 const apiKey = req.headers['api-key'];
 const isvalidkey = validatekey.validateApiKey(apiKey)
 if (isvalidkey.status == 401) {  
   console.log("Unauthorized",apiKey);
     res.status(401).send({
       message: "Unauthorized"
     });
     return;
   }
    Users.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Users was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Users with id=" + id
        });
      });
};

// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
 // Compare API key
 const apiKey = req.headers['api-key'];
 const isvalidkey = validatekey.validateApiKey(apiKey)
 if (isvalidkey.status == 401) {  
   console.log("Unauthorized",apiKey);
     res.status(401).send({
       message: "Unauthorized"
     });
     return;
   }
    Users.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Users was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Users with id=${id}. Maybe Users was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Users with id=" + id
        });
      });
};

// Delete all Userss from the database.
exports.deleteAll = (req, res) => {
   // Compare API key
   const apiKey = req.headers['api-key'];
   const isvalidkey = validatekey.validateApiKey(apiKey)
   if (isvalidkey.status == 401) {  
     console.log("Unauthorized",apiKey);
       res.status(401).send({
         message: "Unauthorized"
       });
       return;
     }
    Users.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Userss were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Userss."
          });
        });
};

// Find all published Users
exports.findAllPublished = (req, res) => {
   // Compare API key
   const isvalidkey = validatekey.validateApiKey(apiKey)
   if (isvalidkey.status == 401) {  
     console.log("Unauthorized",apiKey);
       res.status(401).send({
         message: "Unauthorized"
       });
       return;
     }
    Users.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Userss."
      });
    });
};