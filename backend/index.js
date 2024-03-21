const express = require("express");
const mysql = require("mysql");

const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

// Example query execution
// connection.query("SELECT * FROM your_table", (err, results) => {
//   if (err) throw err;
//   console.log("Data retrieved from MySQL:");
//   console.log(results);
// });

app.get("/api/data", (req, res) => {
  const sql = "SELECT * FROM formdata";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    console.log("Data fetched successfully");
    res.status(200).json(results);
  });
});

app.post("/api/submit", (req, res) => {
  const { username, language, stdin, sourceCode } = req.body;
  // const dateTime = date.now();
  const sql =
    "INSERT INTO formdata (username,language, input, code) VALUES (?, ?, ?,?)";
  const values = [username, language, stdin, sourceCode];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting into database:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    console.log("Form data inserted successfully");
    res.status(200).json({ message: "Form data inserted successfully" });
  });
});

app.listen(process.env.SERVERPORT, () => {
  console.log(`Server is running on port ${process.env.SERVERPORT}`);
});
