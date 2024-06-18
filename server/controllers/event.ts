//create a event
import { Request, Response, response } from "express";
import User from "../models/User";
import Event from "../models/Server";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { ISubEvent } from "../types/models";
import mongoose from "mongoose";
const createEvent = async (req: Request, res: Response) => {
  const { serverName, description } = req.body;
  const userId = req.user.userId;
  const user = await User.findById(userId);

  if (!user) {
    throw new BadRequestError("user not found");
  }

  const event = new Event({
    serverName: serverName,
    description: description,
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
  const { id: eventId } = req.params;
  const userId = req.user.userId;

  console.log(eventId);
  const event = await Event.find({ _id: eventId, host: userId });

  if (!event) {
    throw new BadRequestError("event not found");
  }

  return res.status(StatusCodes.OK).json({
    event,
    msg: "event found",
  });
};

const getAllEvent = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  const events = await Event.find({
    $or: [{ host: userId }, { users: userId },{vendors:userId}],
  }).populate("users").populate("subEvents").populate("vendors").populate("host");

  // role vendor, host or user
  const hostEvents = events.filter(event => event.host.includes(userId));
  const guestEvents = events.filter(event => event.users.includes(userId));
  const vendorEvents = events.filter(event => event.vendors.includes(userId));
  res.status(StatusCodes.OK).json({
    events,
    hostEvents,
    guestEvents,
    vendorEvents,
    msg: "list of all events categorized by user role",
  });
};

const createHost = async (req: Request, res: Response) => {
  const { hostId, eventId } = req.body;
  if (!hostId || !eventId) {
    throw new BadRequestError("Please provide hostId and eventId");
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
  const { id: eventId } = req.params;
  const userId = req.user.userId;
  // console.log(userId);

  // console.log(eventId);
  const event = await Event.find({
    $and: [{ _id: eventId }, { $or: [{ host: userId }, { users: userId }] }],
  }).populate("subEvents");

  if (!event || event.length === 0) {
    throw new BadRequestError("event not found");
  }

  // only get subevents which the user is part of as user host or vendor
  const subEvents = event[0].subEvents.filter((subEvent: any) => {
    if (
      subEvent.admin.some(
        (admin: any) => admin.toString() === userId.toString(),
      ) ||
      subEvent.users.some((user: any) => user.toString() === userId.toString())
      // subEvent.vendors.includes(userId)
    ) {
      return subEvent;
    }
  });

  // console.log(subEvents);

  // role vendor, host or user
  const role = event.map((event) => {
    if (event.host.includes(userId)) {
      return "host";
    }
    if (event.users.includes(userId)) {
      return "user";
    }
    if (event.vendors.includes(userId)) {
      return "vendor";
    }
  });

  // console.log(role[0]);

  return res.status(StatusCodes.OK).json({
    event: event[0],
    role: role[0],
    subEvents,
    msg: "subevents fetched successfully",
  });
};

const searchUser = async (req: Request, res: Response) => {
  const { query } = req.query;
  console.log(query);
  if (!query) {
    throw new BadRequestError("query not found");
  }

  const users = await User.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
      {subroll:{$regex: query, $options: "i" }}
    ],
  });

  return res.status(200).json({ users, msg: "list of searched users" });
};

const getEventMembers = async (req: Request, res: Response) => {
  const { id: eventId } = req.params;
  const userId = req.user.userId;
  const event = await Event.findById(eventId);


  if (!event) {
    throw new BadRequestError("event not found");
  }

  const users = await User.find({
    _id: {
      $in: [...event.host, ...event.users]
    }
  });

  return res.status(StatusCodes.OK).json({
    event,
    msg: "User Found",
    users,
  });
};


const getMyEvent = async (req: Request, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  console.log(userId)
  const events = await Event.find({ users: { $in: [userId] } });

  res.status(StatusCodes.OK).json({
    events,
    msg: "list of my events",
  });
};

const getMyEventAsHost = async (req: Request, res: Response) => {
  // const userId = req.user.userId;
  // console.log(userId)
  // const events = await Event.find({ host: { $in: [userId] } });

  res.status(StatusCodes.OK).json({
    // events,
    msg: "list of my events",
  });
};

const getMyEventAsGuest = async (req: Request, res: Response) => {
  const userId = req.user.userId
  console.log(userId)
  const events = await Event.find({
    host: { $ne: userId },
    $or: [
      { users: userId },
    ]
  }).populate('users host vendors subEvents')

  res.status(StatusCodes.OK).json({
    events,
    msg: "list of my events",
  });
};




export {
  getAllSubEvent,
  deleteEvent,
  removeHost,
  createHost,
  getEvent,
  createEvent,
  getAllEvent,
  searchUser,
  getEventMembers,
  getMyEvent,
  getMyEventAsHost,
  getMyEventAsGuest
};
