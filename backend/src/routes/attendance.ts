
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

import {
  get_all_Users,
  get_User,
  create_User
} from "../controllers/attendance/userController";

import {
  get_all_UserGroups,
  get_UserGroup,
  create_UserGroup
} from "../controllers/attendance/userGroupController"
  ;

  import {
  get_all_Shifts,
  get_Shift,
  create_Shift
} from "../controllers/attendance/shiftController";

import {
  get_all_WorkSchedules,
  get_WorkSchedule,
  create_WorkSchedule
} from "../controllers/attendance/workScheduleController";

import {
  get_all_UserDepartments,
  get_UserDepartment,
  create_UserDepartment
} from "../controllers/attendance/userDepartmentController"
  ;

const attendanceRouter = Router();

attendanceRouter
  .get("/users", get_all_Users)
  .get("/user/:id", get_User)
  .post("/user/", create_User);

attendanceRouter
  .get("/shifts", get_all_Shifts)
  .get("/shift/:id", get_Shift)
  .post("/shift/", create_Shift);

attendanceRouter
  .get("/workschedules", get_all_WorkSchedules)
  .get("/workschedule/:id", get_WorkSchedule)
  .post("/workschedule/", create_WorkSchedule);

attendanceRouter
  .get("/usergroups", get_all_UserGroups)
  .get("/usergroup/:id", get_UserGroup)
  .post("/usergroup/", create_UserGroup);

attendanceRouter
  .get("/punchLogs", get_all_PunchLogs)
  .get("/punchLog/:id", get_PunchLog)
  .post("/punchLog/", create_PunchLog);

attendanceRouter
  .post("/punchDailyCards", get_all_PunchDailyCards)
  .get("/punchDailyCard/:id", get_PunchDailyCard)
  .post("/punchDailyCards/report", get_Report);

  attendanceRouter
  .get("/userDepartments", get_all_UserDepartments)
  .get("/userDepartment/:id", get_UserDepartment)
  .post("/userDepartment/", create_UserDepartment);


export default attendanceRouter;
