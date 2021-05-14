import { Router } from "express";

import {
  get_all_PunchLogs,
  get_PunchLog,
  create_PunchLog,
} from "../controllers/attendance/punchLogController";

import {
  get_all_PunchDailyCards,
  get_PunchDailyCard,
  create_PunchDailyCard,
} from "../controllers/attendance/punchDailyCardController";

import {
  get_all_PunchDailyCardDetails,
  get_PunchDailyCardDetail,
  create_PunchDailyCardDetail,
} from "../controllers/attendance/punchDailyCardDetailsController";

const attendanceRouter = Router();

attendanceRouter
  .get("/punchLogs", get_all_PunchLogs)
  .get("/punchLog/:id", get_PunchLog)
  .post("/punchLog/", create_PunchLog);

attendanceRouter.get("/punchDailyCards", get_all_PunchDailyCards)
  .get("/punchDailyCard/:id", get_PunchDailyCard)
  .post("/punchDailyCard/", create_PunchDailyCard);

attendanceRouter.get("/punchDailyCardDetails", get_all_PunchDailyCards)
  .get("/punchDailyCardDetail/:id", get_PunchDailyCardDetail)
  .post("/punchDailyCardDetail/", create_PunchDailyCardDetail);


export default attendanceRouter;
