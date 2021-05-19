import { Request, Response } from "express";
import PunchLogService from "../../services/attendance/punchLog";
import PunchLog from "../../models/attendance/punchLog";
import ExcelPunchLog from "../../services/attendance/punchLogExcel";

export const get_all_PunchLogs = async (request: Request, response: Response) => {
  const PunchLogs = await PunchLogService.getAll();

  //ExcelPunchLog.fillData(PunchLogs); //fillPunchLog(PunchLogs);

  return response.status(200).json(PunchLogs);
};

export const get_PunchLog = async (request: Request, response: Response) => {
  const { id } =request.params;

  const PunchLog = await PunchLogService.getById(id);

  if (PunchLog) {
    return response.status(200).json(PunchLog);
  }
  return response.status(404).json({ msg: "no PunchLog with that id" });
};

export const create_PunchLog = async (request: Request, response: Response) => {
  const {
    userId,
    userName,
    date,
    json
  } = await request.body;

  try {
    let item: PunchLog = {
      id:0,
      userId,
      userName,
      date,
      json
    };

    item = await PunchLogService.create(item);

    return response.status(200).json(PunchLog);
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a PunchLog with that i", error: e },
    );
  }
};

export const delete_PunchLog = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await PunchLogService.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a PunchLog with that i" },
    );
  }
};
