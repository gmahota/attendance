import { Router } from "express";

import {
  get_all_PunchLogs,
  get_PunchLog,
  create_PunchLog,
} from "../controllers/attendance/punchLogController";

const attendanceRouter = Router();

attendanceRouter.get("/punchLog", get_all_PunchLogs);
attendanceRouter.get("/punchLog/:id", get_PunchLog);
attendanceRouter.post("/punchLog/", create_PunchLog);


export default attendanceRouter;
