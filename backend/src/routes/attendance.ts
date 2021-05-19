import { Router } from "express";

import {
  get_all_PunchLogs,
  get_PunchLog,
  create_PunchLog,
} from "../controllers/attendance/punchLogController";

import {
  get_all_PunchDailyCards,
  get_PunchDailyCard,
  get_Report
} from "../controllers/attendance/punchDailyCardController";

const attendanceRouter = Router();

attendanceRouter
  .get("/punchLogs", get_all_PunchLogs)
  .get("/punchLog/:id", get_PunchLog)
  .post("/punchLog/", create_PunchLog);

attendanceRouter
  .get("/punchDailyCards", get_all_PunchDailyCards)
  .get("/punchDailyCard/:id", get_PunchDailyCard)
  .post("/punchDailyCards/report", get_Report);

export default attendanceRouter;
