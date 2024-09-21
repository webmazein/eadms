const mysql = require("mysql2");
require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbName = process.env.DB_NAME;

const connection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: "",
  database: dbName,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

module.exports = connection;
