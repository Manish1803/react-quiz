const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/data", (req, res) => {
  const filePath = path.join(__dirname, "data/questions.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (err) {
      res.status(500).json({ success: false, message: "Error parsing JSON" });
    }
  });
});

module.exports = app;
