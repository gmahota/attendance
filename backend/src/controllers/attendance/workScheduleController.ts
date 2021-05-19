import { Request, Response } from "express";
import WorkScheduleService from "../../services/attendance/workSchedule";
import WorkSchedule from "../../models/attendance/workSchedule";

export const get_all_WorkSchedules = async (request: Request, response: Response) => {

  const WorkSchedules = await WorkScheduleService.getAll();

  return response.status(200).json(WorkSchedules);
};

export const get_WorkSchedule = async (request: Request, response: Response) => {
  const { id } = request.params;

  const WorkSchedule = await WorkScheduleService.getById(id);

  if (WorkSchedule) {
    return response.status(200).json(WorkSchedule);
  }
  return response.status(404).json({ msg: "no WorkSchedule with that id" });
};

export const create_WorkSchedule = async (request: Request, response: Response) => {
  const {
    id,
    name
  } = await request.body;

  try {
    let item: WorkSchedule = {
      id,
      name
    };

    item = await WorkScheduleService.create(item);

    return response.status(200).json(item);
    
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a product with that i", error: e },
    );
  }
};

export const delete_WorkSchedule = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await productervice.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a order with that i" },
    );
  }
};