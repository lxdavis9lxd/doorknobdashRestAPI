const db = require("../models");
const Address = db.address;
const Op = db.Sequelize.Op;
const validatekey  = require("./validator.js");

// Create and Save a address
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
  if (!req.body.Data[0].City) {
    res.status(400).send({
      message: "Content can not be empty!"
      
    });
    return;
  }
  // Create Address
  const address = req.body.Data.map(data => ({
    ID: data.ID,
    UnitNumber: data.UnitNumber,
    StreetNumber: data.StreetNumber,
    AddressLine1: data.AddressLine1,
    AddressLine2: data.AddressLine2,
    City: data.City,
    Region: data.Region,
    PostalCode: data.PostalCode,
    CountryId: data.CountryId
  }));

  // Save address in the database
  Address.bulkCreate(address)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Address."
      });
    });
 
};

// Retrieve all Address from the database.
exports.findAll = (req, res) => {
       // Read API key from header
  const apiKey = req.headers['api-key'];
  console.log("apikey read",apiKey);
  // Compare API key
  const isvalidkey = validatekey.validateApiKey(apiKey)
  console.log("apikey",apiKey);
  if (isvalidkey.status == 401) {  
    console.log("Unauthorized",apiKey);
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } :  null;
    console.log("condition: " + condition);
    Address.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Address."
        });
      });
};


// Find a single Address with an id
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
    Address.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Address with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Address with id=" + id
        });
      });
};

// Update a Address by the id in the request
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

    Address.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Address was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Address with id=${id}. Maybe Address was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Address with id=" + id
        });
      });
};

// Delete a Address with the specified id in the request
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

    Address.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Address was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Address with id=${id}. Maybe Address was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Address with id=" + id
        });
      });
};

// Delete all Address from the database.
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
    Address.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Address were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Address."
          });
        });
};

// Find all published Address
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
    Address.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Address."
      });
    });
};