import { Request, Response } from "express";
import WorkScheduleService from "../../services/attendance/workSchedule";
import UserService from "../../services/attendance/users";
import ShiftService from "../../services/attendance/shift";
import UserGroupService from "../../services/attendance/userGroup";
import WorkSchedule from "../../models/attendance/workSchedule";

import GroupView from '../../view/attendance/groups'
import UserView from "../../view/attendance/user";

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

export const get_Workschedule_Users = async (request: Request, response: Response) => {
  const { id } = request.params;

  const Users = await UserService.getByScheduleId(id);

  const items = UserView.renderMany(Users)

  return response.status(200).json(items);



  //return response.status(404).json({ msg: "no Users with that schedule id " });
};

export const get_Workschedule_Groups = async (request: Request, response: Response) => {
  const { id } = request.params;

  const Groups = await UserGroupService.getByScheduleId(id);

  const items = GroupView.renderMany(Groups)

  return response.status(200).json(items);
};

export const get_Workschedule_Shifts = async (request: Request, response: Response) => {
  const { id } = request.params;

  const Shifts = await ShiftService.getByScheduleId(id);

  return response.status(200).json(Shifts);
};

export const create_WorkSchedule = async (request: Request, response: Response) => {

  const {
    name,
    type
  } = await request.body;

  try {
    let item: WorkSchedule = {
      id: 0,
      name,
      type
    };

    item = await WorkScheduleService.create(item);

    return response.status(200).json(item);

  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a product with that i", error: e },
    );
  }
};

export const edit_WorkSchedule = async (request: Request, response: Response) => {

  const {
    id,
    name,
    type
  } = await request.body;

  try {


    let item = await WorkScheduleService.getById(id);

    item.name = name;
    item.type = type;

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
