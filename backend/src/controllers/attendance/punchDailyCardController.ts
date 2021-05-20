import { Request, Response } from "express";
import PunchDailyCardService from "../../services/attendance/punchDailyCard";
import PunchDailyCard from "../../models/attendance/punchDailyCard";

export const get_all_PunchDailyCards = async (request: Request, response: Response) => {

  const {
    group,
    user,
    dateBegin,
    dateEnd,
    date
  } = request.body;

  const PunchDailyCards = await PunchDailyCardService.getAll({
    group,
    user,
    dateBegin,
    dateEnd,
    date
  });

  return response.status(200).json(PunchDailyCards);
};

export const get_PunchDailyCard = async (request: Request, response: Response) => {
  const { date } = request.body;

  const PunchDailyCard = await PunchDailyCardService.getByDate(date);

  if (PunchDailyCard) {
    return response.status(200).json(PunchDailyCard);
  }
  return response.status(404).json({ msg: "no PunchDailyCard with that id" });
};

export const get_Report = async (request: Request, response: Response) => {
  const {
    name,
    type,
    group,
    user,
    dateBegin,
    dateEnd
  } = request.body;

  const file = await PunchDailyCardService.getReport({
    name,
    type,
    group,
    user,
    dateBegin,
    dateEnd
  }); 
  response.status(202).json({file});
}
