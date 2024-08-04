const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./route.js");
const cors = require("cors");
// Initialize the app
const app = express();
const PORT = 8080;

// Listen on the server
app.listen(PORT, () => {
  console.log(`Backend is working fine on ${PORT}`);
});

// use cors
app.use(cors());

// use bodyParser
// Request body into -> JS object
app.use(bodyParser.json());
// Form submission -> {key: value} in URL format
app.use(bodyParser.urlencoded({ extended: true }));

// default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./pizza.html"));
});

app.use("/", router);
