//create a event
import { Request, Response, response } from "express";
import User from "../models/User";
import Event from "../models/Server";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { StatusCodes } from "http-status-codes";

const createEvent = async (req: Request, res: Response) => {
  const { serverName } = req.body;
  const userId = req.user.userId;
  const user = await User.findById(userId);

  if (!user) {
    throw new BadRequestError("user not found");
  }

  const event = new Event({
    serverName: serverName,
    users: [userId],
    host: [userId],
  });

  await event.save();

  if (!event) {
    throw new BadRequestError("cannot create event");
  }

  return res.status(StatusCodes.CREATED).json({
    event,
    msg: "new event created",
  });
};

const getEvent = async (req: Request, res: Response) => {
  const { eventId } = req.body;
  const userId = req.user.userId;

  console.log(eventId);
  const event = await Event.find({ _id: eventId, host: userId });

  if (!event) {
    throw new BadRequestError("event not found");
  }

  return res.status(StatusCodes.OK).json({
    event,
    msg: "list of all the events",
  });
};

const getAllEvent = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const events = await Event.find({ host: userId });

    res.status(StatusCodes.OK).json({
      events,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const createHost = async (req: Request, res: Response) => {
  const { hostId, eventId } = req.body;
  if (!hostId || !eventId) {
    return res.status(400).json({
      msg: "incomplete information",
      status: "failure",
    });
  }
  const event = await Event.findById(eventId);
  if (!event) {
    throw new BadRequestError("event not found");
  }
  event?.host?.push(hostId);
  return res.status(StatusCodes.CREATED).json({
    event,
    msg: "new host is created",
  });
};

// const addMember = async(req: Request,res:Response) => {

// }

const removeHost = async (req: Request, res: Response) => {
  const { hostId, eventId } = req.body;
  if (!hostId || !eventId) {
    throw new BadRequestError("Please provide hostId and eventId");
  }
  const event = await Event.findById(eventId);
  if (!event) {
    throw new BadRequestError("event not found");
  }

  event.host = event.host.filter((id) => id.toString() !== hostId);

  await event.save();

  return res.status(StatusCodes.CREATED).json({
    event,
    msg: "host is removed",
  });
};

const deleteEvent = async (req: Request, res: Response) => {
  const { eventId } = req.body;
  if (!eventId) {
    throw new BadRequestError("Please provide eventId");
  }
  const event = await Event.findById(eventId);
  if (!event) {
    throw new BadRequestError("event not found");
  }

  const responce = await Event.deleteOne({ _id: eventId });

  return res.status(StatusCodes.OK).json({
    responce,
    msg: "event deleted successfully",
  });
};

const getAllSubEvent = async (req: Request, res: Response) => {
    const { eventId } = req.body;
  const userId = req.user.userId;

  console.log(eventId);
  const event = await Event.find({ _id: eventId, host: userId }).populate("subEvents");

  if (!event) {
    throw new BadRequestError("event not found");
  }

  return res.status(500).json({
    event,
    msg: "list of all the events",
  });
}

export {
    getAllSubEvent,
  deleteEvent,
  removeHost,
  createHost,
  getEvent,
  createEvent,
  getAllEvent,
};
