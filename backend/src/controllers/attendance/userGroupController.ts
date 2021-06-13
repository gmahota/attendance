import { Request, Response } from "express";
import UserGroupService from "../../services/attendance/userGroup";
import UserGroup from "../../models/attendance/userGroup";
import WorkScheduleService from "../../services/attendance/workSchedule";

export const get_all_UserGroups = async (request: Request, response: Response) => {

  const UserGroups = await UserGroupService.getAll();

  return response.status(200).json(UserGroups);
};

export const get_UserGroup = async (request: Request, response: Response) => {
  const { id } = request.params;

  const UserGroup = await UserGroupService.getById(id);

  if (UserGroup) {
    return response.status(200).json(UserGroup);
  }
  return response.status(404).json({ msg: "no UserGroup with that id" });
};


export const edit_UserGroup = async (request: Request, response: Response) => {

  const {
    id,
    name,
    schedule
  } = await request.body;
  
  try {


    let item = await UserGroupService.getById(id);

    item.name = name;
    item.schedule = schedule;

    item = await UserGroupService.create(item);

    return response.status(200).json(item);

  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a product with that i", error: e },
    );
  }
};


export const create_UserGroup = async (request: Request, response: Response) => {
  const {
    name,
    scheduleId
  } = await request.body;

  try {
    let item: UserGroup = {
      id:0,
      name
    };

    if(!!scheduleId){      
      item.schedule =await WorkScheduleService.getById(scheduleId)
    }
    
    item = await UserGroupService.create(item);

    return response.status(200).json(item);
    
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a product with that i", error: e },
    );
  }
};

export const delete_UserGroup = async (request: Request, response: Response) => {
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