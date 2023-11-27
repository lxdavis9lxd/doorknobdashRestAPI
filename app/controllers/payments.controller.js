const db = require("../models");
const Payments = db.payments;
const Op = db.Sequelize.Op;
const validatekey  = require("../controllers/validator.js");
// Create and Save a new Payments
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

  // Create a Payments
  const payments = req.body.Data.map(data => ({
    "Customernumber":data.Customernumber,
    "Transactionnumber": data.Transactionnumber,
    "PaymentDate": data.PaymentDate,
    "Amount": data.Amount,
    "CreatedBy": data.CreatedBy,
    "ModifiedBy": data.ModifiedBy
  }));

  // Save Payments in the database
  Payments.bulkCreate(payments)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Payments."
      });
    });

};

// Retrieve all Paymentss from the database.
exports.findAll = (req, res) => {
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
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Payments.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Paymentss."
        });
      });
};

// Find a single Payments with an id
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
    Payments.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Payments with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Payments with id=" + id
        });
      });
};

// Update a Payments by the id in the request
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
    Payments.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Payments was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Payments with id=${id}. Maybe Payments was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Payments with id=" + id
        });
      });
};

// Delete a Payments with the specified id in the request
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
    Payments.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Payments was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Payments with id=${id}. Maybe Payments was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Payments with id=" + id
        });
      });
};

// Delete all Paymentss from the database.
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
    Payments.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Paymentss were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Paymentss."
          });
        });
};

// Find all published Paymentss
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
    Payments.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Paymentss."
      });
    });
};