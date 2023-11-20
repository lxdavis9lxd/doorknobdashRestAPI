const db = require("../models");
const Offices = db.offices;
const Op = db.Sequelize.Op;
const validatekey  = require("../controllers/validator.js");

// Create and Save a new Offices
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
  if (!req.body.Data) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Offices
  const offices =  req.body.Data.map(data => ({
      "OfficeCode": data.OfficeCode,
      "City": data.City,
      "Phone": data.Phone,
      "Addressline1": data.Addressline1,
      "Addressline2": data.Addressline2,
      "State": data.State,
      "Country":data.Country,
      "PostalCode": data.PostalCode,
      "Territory": data.Territory,
      "CreatedBy": data.CreatedBy,
      "ModifiedBy": data.ModifiedBy
  }));

  // Save Offices in the database
  Offices.bulkCreate(offices)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Offices."
      });
    });

};

// Retrieve all Officess from the database.
exports.findAll = (req, res) => {
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
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Offices.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Officess."
        });
      });
};

// Find a single Offices with an id
exports.findOne = (req, res) => {
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

    Offices.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Offices with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Offices with id=" + id
        });
      });
};

// Update a Offices by the id in the request
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

    Offices.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Offices was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Offices with id=${id}. Maybe Offices was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Offices with id=" + id
        });
      });
};

// Delete a Offices with the specified id in the request
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

    Offices.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Offices was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Offices with id=${id}. Maybe Offices was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Offices with id=" + id
        });
      });
};

// Delete all Officess from the database.
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
    Offices.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Officess were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Officess."
          });
        });
};

// Find all published Officess
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
    Offices.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Officess."
      });
    });
};