import { Router } from "express";

import timeCardReport from "./models/timeCardRecord.js";

const routes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Employees:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *           example: 0
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne Graham
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Home Page
 *     description: Can be used to testing an API.
 */
routes.get("/", async function (req, res) {
  res.send("WellCome!");
});

routes.get("/api/reports/individuals", async (req, res) => {
  const items = await timeCardReport.getTimeCardReport();
  timeCardReport.fillExcell(items);
  sendJsonResult(res, items);
});

routes.get("/api/reports/employees", async (req, res) => {
  sendJsonResult(res, await group.getAll());
});

routes.get("/api/employees", async (req, res) => {
  sendJsonResult(res, [{ id: 1 }, { id: 2 }]);
});

routes.get("/api/employe/:id", async (req, res) => {
  sendJsonResult(res, { id: 1 });
});

routes.get("/api/departments", async (req, res) => {
  sendJsonResult(res, [
    { id: 1, dep: "OLA 1" },
    { id: 2, dep: "OLA 2" },
  ]);
});

routes.get("/api/department/:id", async (req, res) => {
  sendJsonResult(res, { id: 2, dep: "OLA 2" });
});

routes.get("/api/shifts", async (req, res) => {
  sendJsonResult(res, [{ id: "Turno 1" }, { id: "Turno 2" }]);
});

routes.get("api/shift/:id", async (req, res) => {
  sendJsonResult(res, { id: "Turno 1" });
});

function sendJsonResult(res, obj) {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(obj));
}

export default routes;
