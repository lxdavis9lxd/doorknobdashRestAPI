const db = require("../models");
const SPKusers = db.SPKusers;
const Op = db.Sequelize.Op;
const validatekey  = require("../controllers/validator.js");
// Create and Save a new SPKusers
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
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a SPKusers
  const SPKusers = req.body.Data.map(data => ({
    "UserName": data.UserName,
      "Pword": data.Pword,
      "Userrole": data.Userrole,
      "Employeenumber": data.Employeenumber,
  }));

  // Save SPKusers in the database
  SPKusers.create(SPKusers)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SPKusers."
      });
    });

};

// Retrieve all SPKuserss from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
   // Compare API key
   const isvalidkey = validatekey.validateApiKey(apiKey)
   if (isvalidkey.status == 401) {  
     console.log("Unauthorized",apiKey);
       res.status(401).send({
         message: "Unauthorized"
       });
       return;
     }
    SPKusers.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving SPKuserss."
        });
      });
};

// Find a single SPKusers with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
 // Compare API key
 const isvalidkey = validatekey.validateApiKey(apiKey)
 if (isvalidkey.status == 401) {  
   console.log("Unauthorized",apiKey);
     res.status(401).send({
       message: "Unauthorized"
     });
     return;
   }
    SPKusers.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find SPKusers with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving SPKusers with id=" + id
        });
      });
};

// Update a SPKusers by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
 // Compare API key
 const isvalidkey = validatekey.validateApiKey(apiKey)
 if (isvalidkey.status == 401) {  
   console.log("Unauthorized",apiKey);
     res.status(401).send({
       message: "Unauthorized"
     });
     return;
   }
    SPKusers.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "SPKusers was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update SPKusers with id=${id}. Maybe SPKusers was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating SPKusers with id=" + id
        });
      });
};

// Delete a SPKusers with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
 // Compare API key
 const isvalidkey = validatekey.validateApiKey(apiKey)
 if (isvalidkey.status == 401) {  
   console.log("Unauthorized",apiKey);
     res.status(401).send({
       message: "Unauthorized"
     });
     return;
   }
    SPKusers.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "SPKusers was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete SPKusers with id=${id}. Maybe SPKusers was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete SPKusers with id=" + id
        });
      });
};

// Delete all SPKuserss from the database.
exports.deleteAll = (req, res) => {
   // Compare API key
   const isvalidkey = validatekey.validateApiKey(apiKey)
   if (isvalidkey.status == 401) {  
     console.log("Unauthorized",apiKey);
       res.status(401).send({
         message: "Unauthorized"
       });
       return;
     }
    SPKusers.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} SPKuserss were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all SPKuserss."
          });
        });
};

// Find all published SPKuserss
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
    SPKusers.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SPKuserss."
      });
    });
};