const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

app.use(bodyParser.json());

var cors = require("cors");
app.use(
  cors({
    origin: process.env.cors_origin ? process.env.cors_origin.split(",") : "*",
    credentials: process.env.cors_credentials,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.su4aqcm.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
