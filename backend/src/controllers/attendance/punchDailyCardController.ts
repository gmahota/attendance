import { Request, Response } from "express";
import PunchDailyCardService from "../../services/attendance/punchDailyCard";
import PunchDailyCard from "../../models/attendance/punchDailyCard";

export const get_all_PunchDailyCards = async (request: Request, response: Response) => {
  const PunchDailyCards = await PunchDailyCardService.getAll();
  return response.status(200).json(PunchDailyCards);
};

export const get_PunchDailyCard = async (request: Request, response: Response) => {
  const { id } =request.params;

  const PunchDailyCard = await PunchDailyCardService.getById(id);

  if (PunchDailyCard) {
    return response.status(200).json(PunchDailyCard);
  }
  return response.status(404).json({ msg: "no PunchDailyCard with that id" });
};

export const create_PunchDailyCard = async (request: Request, response: Response) => {
  const {
    userId,
    userName,
    date,
    json
  } = await request.body;

  try {
    let item: PunchDailyCard = {
      id:0,
      userId,
      userName,
      date,
      json
    };

    item = await PunchDailyCardService.create(item);

    return response.status(200).json(PunchDailyCard);
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a PunchDailyCard with that i", error: e },
    );
  }
};

export const delete_PunchDailyCard = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await PunchDailyCardService.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a PunchDailyCard with that i" },
    );
  }
};
