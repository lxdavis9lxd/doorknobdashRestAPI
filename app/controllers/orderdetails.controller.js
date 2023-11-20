const db = require("../models");
const Orderdetails = db.orderdetailss;
const Op = db.Sequelize.Op;
const validatekey  = require("../controllers/validator.js");


// Create and Save a new Orderdetails
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

  // Create a Orderdetails
  const Orderdetails = req.body.Data.map(data => ({
    "Ordernumber": data.Ordernumber,
      "ProductCode": data.ProductCode,
      "Quantityordered": data.Quantityordered,
      "Priceeach": data.Priceeach,
      "Orderlinenumber": data.Orderlinenumber,
      "CreatedBy": data.CreatedBy,
      "ModifiedBy": data.ModifiedBy
  }));

  // Save Orderdetails in the database
  Orderdetails.bulkCreate(Orderdetails)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Orderdetails."
      });
    });

};

// Retrieve all Orderdetailss from the database.
exports.findAll = (req, res) => {
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
  
    Orderdetails.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Orderdetailss."
        });
      });
};

// Find a single Orderdetails with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    const isvalidkey = validatekey.validateApiKey(apiKey)
  if (isvalidkey.status == 401) {  
    console.log("Unauthorized",apiKey);
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }
    Orderdetails.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Orderdetails with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Orderdetails with id=" + id
        });
      });
};

// Update a Orderdetails by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const isvalidkey = validatekey.validateApiKey(apiKey)
  if (isvalidkey.status == 401) {  
    console.log("Unauthorized",apiKey);
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }
    Orderdetails.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Orderdetails was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Orderdetails with id=${id}. Maybe Orderdetails was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Orderdetails with id=" + id
        });
      });
};

// Delete a Orderdetails with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    const isvalidkey = validatekey.validateApiKey(apiKey)
  if (isvalidkey.status == 401) {  
    console.log("Unauthorized",apiKey);
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    } 
    Orderdetails.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Orderdetails was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Orderdetails with id=${id}. Maybe Orderdetails was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Orderdetails with id=" + id
        });
      });
};

// Delete all Orderdetailss from the database.
exports.deleteAll = (req, res) => {
  const isvalidkey = validatekey.validateApiKey(apiKey)
  if (isvalidkey.status == 401) {  
    console.log("Unauthorized",apiKey);
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }
    Orderdetails.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Orderdetailss were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Orderdetailss."
          });
        });
};

// Find all published Orderdetailss
exports.findAllPublished = (req, res) => {
  const isvalidkey = validatekey.validateApiKey(apiKey)
  if (isvalidkey.status == 401) {  
    console.log("Unauthorized",apiKey);
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }
   Orderdetails.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orderdetailss."
      });
    });
};