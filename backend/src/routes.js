var routes = require("express").Router();
//var GroupRepositor = require("./repository/groupRepository");

// routes.get("/api/groups/", async (req, res) => {
//   const group = new GroupRepositor();
//   sendJsonResult(res, await group.getAll());
// });

routes.get("/attendance/reports", async (req, res) => {
  sendJsonResult(res, await group.getAll());
});

function sendJsonResult(res, obj) {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(obj));
}

module.exports = routes;
