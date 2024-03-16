
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
app.get("/store", (req, res) => {
  res.json({ message: "Welcome to MySQL Sequelize application.   " + corsOptions.origin});
});




require("./app/routes/address.routes")(app);
require("./app/routes/country.routes")(app);
require("./app/routes/customer.routes")(app);
require("./app/routes/customeraddress.routes")(app);
require("./app/routes/foodorder.routes")(app);
require("./app/routes/deliverdriver.routes")(app);
require("./app/routes/menuitem.routes")(app);
require("./app/routes/ordermenuitem.routes")(app);
require("./app/routes/orderstaus.routes")(app);
require("./app/routes/restaurant.routes")(app);
require("./app/routes/user.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


