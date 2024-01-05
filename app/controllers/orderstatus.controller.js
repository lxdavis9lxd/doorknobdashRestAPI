const db = require("../models");
const Orderstatus = db.orderstatus;
const Op = db.Sequelize.Op;
const validatekey  = require("./validator.js");

// Create and Save a new Customer
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
  // Create Orderstatus
  const orderstatus = req.body.Data.map(data => ({
    ID: data.ID,
    StatusValue: data.StatusValue
  }));
  // Save orderstatus in the database
  Orderstatus.bulkCreate(orderstatus)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Orderstatus."
      });
    });
 
};

// Retrieve all Orderstatus from the database.
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
    Orderstatus.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Orderstatus."
        });
      });
};


// Find a single Orderstatus with an id
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
    Orderstatus.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Orderstatus with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Orderstatus with id=" + id
        });
      });
};

// Update a Orderstatus by the id in the request
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

    Orderstatus.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Orderstatus was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Orderstatus with id=${id}. Maybe Orderstatus was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Orderstatus with id=" + id
        });
      });
};

// Delete a Orderstatus with the specified id in the request
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

    Orderstatus.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Orderstatus was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Orderstatus with id=${id}. Maybe Orderstatus was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Orderstatus with id=" + id
        });
      });
};

// Delete all Orderstatus from the database.
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
    Orderstatus.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Orderstatus were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Orderstatus."
          });
        });
};

// Find all published Orderstatus
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
    Orderstatus.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orderstatus."
      });
    });
};