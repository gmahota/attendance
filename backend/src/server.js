var express = require("express");
var dotenv = require("dotenv").config();
var app = express();
var routes = require("./routes");

app.use("/api", routes);

var MariaDBAdapter = require("./database/connection");

app.get("/", async function (req, res) {
  var db = new MariaDBAdapter();
  var time = await db.getTimeCardReport();

  sendJsonResult(res, time);
  //db.test();
});

function sendJsonResult(res, obj) {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(obj));
}

app.listen(process.env.PORT || 5000, function () {
  console.log(`Listening ${process.env.PORT || 5000}`);
});
