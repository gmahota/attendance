import { Request, Response } from "express";
import UserService from "../../services/attendance/users";
import User from "../../models/attendance/user";

export const get_all_Users = async (request: Request, response: Response) => {
  const {
    group,
    department
  } = request.body;

  const Users = await UserService.getAll({
    group,
    department
  });

  return response.status(200).json(Users);
};

export const get_User = async (request: Request, response: Response) => {
  const { id } = request.params;

  const User = await UserService.getById(id);

  if (User) {
    return response.status(200).json(User);
  }
  return response.status(404).json({ msg: "no User with that id" });
};

export const create_User = async (request: Request, response: Response) => {
  const {
    name,
    scheduleByUserOrGroup,
    userGroup,
    schedule
  } = await request.body;

  try {
    let item: User = {
      id:0,
      name,
      scheduleByUserOrGroup,
      userGroup,
      schedule
    };

    item = await UserService.create(item);

    return response.status(200).json(item);
    
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a product with that i", error: e },
    );
  }
};

export const delete_user = async (request: Request, response: Response) => {
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