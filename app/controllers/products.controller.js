const db = require("../models");
const Products = db.products;
const Op = db.Sequelize.Op;
const validatekey  = require("../controllers/validator.js");
// Create and Save a new Products
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

  // Create a Products
  const Products = req.body.Data.map(data => ({
    "ProductCode":data.ProductCode,
      "ProductName": data.ProductName,
      "Productline": data.Productline,
      "Productscale": data.Productscale,
      "Productvendor": data.Productvendor,
      "Productdescription": data.Productdescription,
      "Quantityinstock": data.Quantityinstock,
      "Buyprice": data.Buyprice,
      "Msrp": data.Msrp,
      "CreatedBy": data.CreatedBy,
      "ModifiedBy": data.ModifiedBy
  }));

  // Save Products in the database
  Products.bulkCreate(Products)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Products."
      });
    });

};

// Retrieve all Productss from the database.
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
  
    Products.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Productss."
        });
      });
};

// Find a single Products with an id
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
    Products.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Products with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Products with id=" + id
        });
      });
};

// Update a Products by the id in the request
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
    Products.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Products was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Products with id=${id}. Maybe Products was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Products with id=" + id
        });
      });
};

// Delete a Products with the specified id in the request
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
    Products.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Products was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Products with id=${id}. Maybe Products was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Products with id=" + id
        });
      });
};

// Delete all Productss from the database.
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
    Products.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Productss were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Productss."
          });
        });
};

// Find all published Productss
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
    Products.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Productss."
      });
    });
};