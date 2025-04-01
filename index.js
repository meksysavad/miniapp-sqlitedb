const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Create or connect to the SQLite database
const db = new sqlite3.Database("./mydatabase.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

app.post("/execute", async (req, res) => {
  const command = req.body.command;
  db.all(command, [], (err, rows) => {
    if (err) {
      console.error("Error executing command:", err.message);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
