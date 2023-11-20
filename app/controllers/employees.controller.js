const db = require("../models");
const Employees = db.employees;
const Op = db.Sequelize.Op;
const validatekey  = require("../controllers/validator.js");

// Create and Save a new Employees
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

  // Create a Employees
  const employees = req.body.Data.map(data => ({
    "id": data.Employeenumber,
    "LastName": data.LastName,
    "FirstName": data.FirstName,
    "Extension": data.Extension,
    "Email": data.Email,
    "OfficeCode": data.OfficeCode,
    "Reportsto": data.Reportsto,
    "Jobtitle": data.Jobtitle,
    "Phone": data.Phone,
    "CreatedBy": data.CreatedBy,
    "ModifiedBy": data.ModifiedBy
  }));

  // Save Employees in the database
  Employees.bulkCreate(employees)
    .then(data => {
      console.log("data",data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employees."
      });
    });

};

// Retrieve all Employees from the database.
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
    console.log("condition: " + condition);
    Employees.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Employees."
        });
      });
};

// Find a single Employees with an id
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

    Employees.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Employees with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Employees with id=" + id
        });
      });
};

// Update a Employees by the id in the request
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

    Employees.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employees was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Employees with id=${id}. Maybe Employees was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Employees with id=" + id
        });
      });
};

// Delete a Employees with the specified id in the request
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

    Employees.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employees was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Employees with id=${id}. Maybe Employees was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Employees with id=" + id
        });
      });
};

// Delete all Employees from the database.
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
    Employees.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Employees were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Employees."
          });
        });
};

// Find all published Employees
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
    Employees.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees."
      });
    });
};