const db = require("../models");
const Ordermenuitem = db.ordermenuitem;
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
  // Create Ordermenuitem
  const ordermenuitem = req.body.Data.map(data => ({
    ID: data.ID,
    OrderId: data.OrderId,
    MenuItemId: data.MenuItemId,
    QtyOrdered: data.QtyOrdered
  }));

  // Save ordermenuitem in the database
  Ordermenuitem.bulkCreate(ordermenuitem)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Ordermenuitem."
      });
    });
 
};

// Retrieve all Ordermenuitem from the database.
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
    Ordermenuitem.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Ordermenuitem."
        });
      });
};


// Find a single Ordermenuitem with an id
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
    Ordermenuitem.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Ordermenuitem with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Ordermenuitem with id=" + id
        });
      });
};

// Update a Ordermenuitem by the id in the request
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

    Ordermenuitem.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Ordermenuitem was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Ordermenuitem with id=${id}. Maybe Ordermenuitem was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Ordermenuitem with id=" + id
        });
      });
};

// Delete a Ordermenuitem with the specified id in the request
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

    Ordermenuitem.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Ordermenuitem was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Ordermenuitem with id=${id}. Maybe Ordermenuitem was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Ordermenuitem with id=" + id
        });
      });
};

// Delete all Ordermenuitem from the database.
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
    Ordermenuitem.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Ordermenuitem were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Ordermenuitem."
          });
        });
};

// Find all published Ordermenuitem
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
    Ordermenuitem.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Ordermenuitem."
      });
    });
};