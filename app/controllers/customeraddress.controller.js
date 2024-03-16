const db = require("../models");
const Customeraddress = db.customeraddress;
const Op = db.Sequelize.Op;
const validatekey  = require("./validator.js");

// Create and Save a new customeraddress
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
  if (!req.body.Data[0].AddressId) {
    res.status(400).send({
      message: "Content can not be empty!"
      
    });
    return;
  }
  // Create Customeraddress
  const customeraddress = req.body.Data.map(data => ({
    ID: data.ID,
    CustomerId: data.CustomerId,
    AddressId: data.AddressId
  }));
  // Savecustomeraddress in the database
  Customeraddress.bulkCreate(customeraddress)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Customeraddress."
      });
    });
 
};

// Retrieve all Customeraddress from the database.
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
    Customeraddress.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Customeraddress."
        });
      });
};


// Find a single Customeraddress with an id
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
    Customeraddress.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Customeraddress with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Customeraddress with id=" + id
        });
      });
};

// Update a Customeraddress by the id in the request
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

    Customeraddress.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customeraddress was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Customeraddress with id=${id}. Maybe Customeraddress was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Customeraddress with id=" + id
        });
      });
};

// Delete a Customeraddress with the specified id in the request
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

    Customeraddress.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customeraddress was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Customeraddress with id=${id}. Maybe Customeraddress was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Customeraddress with id=" + id
        });
      });
};

// Delete all Customeraddress from the database.
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
    Customeraddress.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Customeraddress were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Customeraddress."
          });
        });
};

// Find all published Customeraddress
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
    Customeraddress.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customeraddress."
      });
    });
};