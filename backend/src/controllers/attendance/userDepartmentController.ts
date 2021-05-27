import { Request, Response } from "express";
import UserDepartmentService from "../../services/attendance/userDepartment";
import UserDepartment from "../../models/attendance/userDepartment";

export const get_all_UserDepartments = async (request: Request, response: Response) => {

  const UserDepartments = await UserDepartmentService.getAll();

  return response.status(200).json(UserDepartments);
};

export const get_UserDepartment = async (request: Request, response: Response) => {
  const { id } = request.params;

  console.log(id)

  const UserDepartment = await UserDepartmentService.getById(id);

  if (UserDepartment) {
    return response.status(200).json(UserDepartment);
  }
  return response.status(404).json({ msg: "no UserDepartment with that id" });
};

export const create_UserDepartment = async (request: Request, response: Response) => {
  const {
    id,
    name,
    scheduleId
  } = await request.body;

  try {
    let item: UserDepartment = {
      id,
      name,

    };

    item = await UserDepartmentService.create(item);

    return response.status(200).json(item);

  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a product with that i", error: e },
    );
  }
};

export const delete_UserDepartment = async (request: Request, response: Response) => {
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
