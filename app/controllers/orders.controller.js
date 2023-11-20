const db = require("../models");
const Orders = db.orders;
const Op = db.Sequelize.Op;
const validatekey  = require("../controllers/validator.js");
// Create and Save a new Orders
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

  // Create a Orders
  const Orders = req.body.Data.map(data => ({
    "Ordernumber": data.Ordernumber,
    "OrderDate": data.OrderDate,
    "RequiredDate": data.RequiredDate,
    "ShippedDate": data.ShippedDate,
    "Status": data.Status,
    "Comments": data.Comments,
    "Customernumber": data.Customernumber,
    "CreatedBy": data.CreatedBy,
    "ModifiedBy": data.ModifiedBy
  }));

  // Save Orders in the database
  Orders.bulkCreate(Orders)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Orders."
      });
    });

};

// Retrieve all Orderss from the database.
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
  
    Orders.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Orderss."
        });
      });
};

// Find a single Orders with an id
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

    Orders.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Orders with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Orders with id=" + id
        });
      });
};

// Update a Orders by the id in the request
exports.update = (req, res) => {
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
    const id = req.params.id;

    Orders.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Orders was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Orders with id=${id}. Maybe Orders was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Orders with id=" + id
        });
      });
};

// Delete a Orders with the specified id in the request
exports.delete = (req, res) => {
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
    const id = req.params.id;

    Orders.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Orders was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Orders with id=${id}. Maybe Orders was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Orders with id=" + id
        });
      });
};

// Delete all Orderss from the database.
exports.deleteAll = (req, res) => {
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
    Orders.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Orderss were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Orderss."
          });
        });
};

// Find all published Orderss
exports.findAllPublished = (req, res) => {
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
    Orders.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orderss."
      });
    });
};