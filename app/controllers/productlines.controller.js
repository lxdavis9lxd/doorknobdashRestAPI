const db = require("../models");
const validate = require("validator");
const ProductLines = db.productlines;
const Op = db.Sequelize.Op;
const validatekey  = require("../controllers/validator.js");
// Create and Save a new ProductLines
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

  // Create a ProductLines
  const ProductLines = {
    "Productline": data.Productline,
    "Textdescription": data.Textdescription,
    "Htmldescription": data.Htmldescription,
    "Image": data.Image,
    "CreatedBy": data.CreatedBy,
    "ModifiiedBy":data.ModifiiedBy
  };

  // Save ProductLines in the database
  ProductLines.bulkCreate(productLines)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ProductLines."
      });
    });

};

// Retrieve all ProductLiness from the database.
exports.findAll = (req, res) => {
   // Compare API key
   const isvalidkey = validatekey.validateApiKey(apiKey)
   if (isvalidkey.status == 401) {  
     console.log("Unauthorized",apiKey);
       res.status(401).send({
         message: "Unauthorized"
       });
       return;
     }
  //validateApiKey()
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    ProductLines.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ProductLiness."
        });
      });
};

// Find a single ProductLines with an id
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
    ProductLines.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find ProductLines with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving ProductLines with id=" + id
        });
      });
};

// Update a ProductLines by the id in the request
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
    ProductLines.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ProductLines was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update ProductLines with id=${id}. Maybe ProductLines was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating ProductLines with id=" + id
        });
      });
};

// Delete a ProductLines with the specified id in the request
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
    ProductLines.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ProductLines was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ProductLines with id=${id}. Maybe ProductLines was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ProductLines with id=" + id
        });
      });
};

// Delete all ProductLiness from the database.
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
    ProductLines.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} ProductLiness were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all ProductLiness."
          });
        });
};

// Find all published ProductLiness
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
    ProductLines.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ProductLiness."
      });
    });
};