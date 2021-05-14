import { Request, Response } from "express";
import PunchDailyCardDetailsService from "../../services/attendance/punchDailyCardDetails";
import PunchDailyCardDetails from "../../models/attendance/punchDailyCardDetails";

export const get_all_PunchDailyCardDetails = async (request: Request, response: Response) => {
  const PunchDailyCardDetailss = await PunchDailyCardDetailsService.getAll();
  return response.status(200).json(PunchDailyCardDetailss);
};

export const get_PunchDailyCardDetail = async (request: Request, response: Response) => {
  const { id } =request.params;

  const PunchDailyCardDetails = await PunchDailyCardDetailsService.getById(id);

  if (PunchDailyCardDetails) {
    return response.status(200).json(PunchDailyCardDetails);
  }
  return response.status(404).json({ msg: "no PunchDailyCardDetails with that id" });
};

export const create_PunchDailyCardDetail = async (request: Request, response: Response) => {
  const {
    userId,
    userName,
    date,
    json
  } = await request.body;

  try {
    let item: PunchDailyCardDetails = {
      id:0,
      userId,
      userName,
      date,
      json
    };

    item = await PunchDailyCardDetailsService.create(item);

    return response.status(200).json(PunchDailyCardDetails);
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a PunchDailyCardDetails with that i", error: e },
    );
  }
};

export const delete_PunchDailyCardDetails = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await PunchDailyCardDetailsService.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a PunchDailyCardDetails with that i" },
    );
  }
};
