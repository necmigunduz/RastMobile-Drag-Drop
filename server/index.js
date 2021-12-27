// Index.js
let express = require("express");
let apiRoutes = require("./api-routes");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
require("dotenv").config();

let app = express();
// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/resthub", { useNewUrlParser: true });
var db = mongoose.connection;

if (!db) console.log("Error connecting the database");
else console.log("The database connected successfully");

var port = process.env.PORT || 8081;

app.get("/", (req, res) => res.send("Hello World with Express"));
app.use("/api", apiRoutes);
app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});