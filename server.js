
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

const db = require("./app/models");
console.log("db: " + db);

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });



// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MySQL Sequelize application." });
});



require("./app/routes/turorial.routes")(app);
require("./app/routes/customer.routes")(app);
require("./app/routes/employees.routes")(app);
require("./app/routes/offices.routes")(app);
require("./app/routes/orders.routes")(app);
require("./app/routes/orderdetails.routes")(app);
require("./app/routes/payments.routes")(app);
require("./app/routes/productlines.routes")(app);
require("./app/routes/products.routes")(app);
require("./app/routes/SPKusers.routes")(app);
require("./app/routes/users.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


