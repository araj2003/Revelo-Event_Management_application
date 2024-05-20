//create a event
import { Request, Response, response } from "express";
import User from "../models/User";
import eventSchemma from "../models/Server";
import { BadRequestError, UnauthenticatedError } from "../errors";

const createEvent = async (req: Request, res: Response) => {
  const { serverName } = req.body;
  const userId = req.user.userId;
  const user = await User.findById(userId);

  if (!user) {
    throw new BadRequestError("user not found");
  }

  const event = new eventSchemma({
    serverName: serverName,
    users: [userId],
    host: [userId],
  });

  await event.save();

  if (!event) {
    throw new BadRequestError("cannot create event");
  }

  return res.status(500).json({
    event,
    msg: "new event created",
  });
};

const getEvent = async (req: Request, res: Response) => {
  const { eventId } = req.body;
  const userId = req.user.userId;

  console.log(eventId);
  const event = await eventSchemma.find({ _id: eventId, host: userId });

  if (!event) {
    throw new BadRequestError("event not found");
  }

  return res.status(500).json({
    event,
    msg: "list of all the events",
  });
};

const getAllEvent = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const events = await eventSchemma.find({ host: userId });

    res.status(200).json({
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
  const event = await eventSchemma.findById(eventId);
  if (!event) {
    throw new BadRequestError("event not found");
  }
  event?.host?.push(hostId);
  return res.status(500).json({
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
  const event = await eventSchemma.findById(eventId);
  if (!event) {
    throw new BadRequestError("event not found");
  }

  event.host = event.host.filter((id) => id.toString() !== hostId);

  await event.save();

  return res.status(500).json({
    event,
    msg: "host is removed",
  });
};

const deleteEvent = async (req: Request, res: Response) => {
  const { eventId } = req.body;
  if (!eventId) {
    throw new BadRequestError("Please provide eventId");
  }
  const event = await eventSchemma.findById(eventId);
  if (!event) {
    throw new BadRequestError("event not found");
  }

  const responce = await eventSchemma.deleteOne({ _id: eventId });

  return res.status(500).json({
    responce,
    msg: "event deleted successfully",
  });
};

export {
  deleteEvent,
  removeHost,
  createHost,
  getEvent,
  createEvent,
  getAllEvent,
};
