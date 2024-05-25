import { Request, Response } from "express";
import SubEvent from "../models/SubEvent";
import Meeting from "../models/meeting";

// Get all sub-events with dates and times
export const getSubEventDates = async (req: Request, res: Response) => {
  const subEvents = await SubEvent.find(
    {},
    { subEventName: 1, subEventDate: 1, subEventTime: 1 },
  );
  res.status(200).json({ subEvents, msg: "subevent Schedule" });
};

// Get all meetings with dates and times
export const getMeetingDates = async (req: Request, res: Response) => {
  const meetings = await Meeting.find(
    {},
    { topic: 1, startDate: 1, startTime: 1 },
  );
  res.status(200).json({ meetings, msg: "meeting schedule" });
};
