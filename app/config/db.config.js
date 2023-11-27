
//const mysql = require('mysql2');


module.exports = {
  HOST: "mi3-ss121.a2hosting.com",
  USER: "bdpamked",
  PASSWORD: "U;qibKs[2KC607",
  DB: "bdpamked_student_DBv1",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
