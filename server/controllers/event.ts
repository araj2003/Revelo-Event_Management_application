//create a event
import { Request, Response, response } from "express";
import User from "../models/User";
import Event from "../models/Server";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { ISubEvent } from "../types/models";
import mongoose from "mongoose";
import Notification from "../models/Notification";

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
    $or: [{ host: userId }, { users: userId }, { vendors: userId }],
  })
    .populate("users")
    .populate("subEvents")
    .populate("vendors")
    .populate("host");

  // Add role of the user in each event
  const eventsWithRole = events.map((event) => {
    let role = "";
    // Assuming userId is already a string. If not, ensure it's converted to a string where it's defined.
    if (event.host.some((host) => host._id.equals(userId))) {
      role = "Host";
    } else if (event.vendors.some((vendor) => vendor._id.equals(userId))) {
      role = "Vendor";
    } else if (event.users.some((user) => user._id.equals(userId))) {
      role = "Guest";
    }
    return { ...event.toObject(), role }; // Convert Mongoose document to object and add role
  });

  res.status(StatusCodes.OK).json({
    events: eventsWithRole,
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

  // Check if user is already a host
  if (!event.host.includes(hostId)) {
    // Add user to host array
    event.host.push(hostId);

    // Remove user from users array if present
    const userIndex = event.users.indexOf(hostId);
    if (userIndex > -1) {
      event.users.splice(userIndex, 1);
    }

    // Save the updated event
    await event.save();

    const notifications = await Notification.create({
      userId: hostId,
      message: `You have been added as a host to the event ${event?.serverName}`,
      url: `/event/${eventId}`,
    });

    console.log(notifications);

    return res.status(StatusCodes.CREATED).json({
      event,
      msg: "New host added successfully",
    });
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "User is already a host",
    });
  }
};

// const addMember = async(req: Request,res:Response) => {

// }

const removeHost = async (req: Request, res: Response) => {
  const { hostId, eventId } = req.body;
  // Find the event
  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ msg: "Event not found" });
  }
  // Check if the user is a host
  const index = event.host.indexOf(hostId);
  if (index > -1) {
    // Remove the user from the host list
    event.host.splice(index, 1);
    // Optionally, add the user back to the general event user list if not already present
    if (!event.users.includes(hostId)) {
      event.users.push(hostId);
    }
    await event.save();

    const notifications = await Notification.create({
      userId: hostId,
      message: `You have been removed as a host to the event ${event?.serverName}`,
      url: `/event/${eventId}`,
    });

    console.log(notifications);
    return res
      .status(200)
      .json({ msg: "Host removed and user added back to the event" });
  } else {
    return res.status(400).json({ msg: "User is not a host" });
  }
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
    $and: [{ _id: eventId }, { $or: [{ host: userId }, { users: userId }, {vendors: userId}] }],
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
      { subroll: { $regex: query, $options: "i" } },
    ],
  });

  return res.status(200).json({ users, msg: "list of searched users" });
};

// Define interfaces for better type checking
interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: string;
  subroll?: string; // Assuming subroll is optional
}

interface ICategorizedUsers {
  hosts: IUser[];
  vendors: IUser[];
  guests: IUser[];
}

const getEventMembers = async (req: Request, res: Response) => {
  const { id: eventId } = req.params;
  const event = await Event.findById(eventId);

  if (!event) {
    throw new BadRequestError("event not found");
  }

  // Fetch all users related to the event
  const users: any = await User.find({
    _id: {
      $in: [...event.host, ...event.users, ...event.vendors],
    },
  }).populate("name email role subroll");

  // Categorize users into hosts, vendors, and guests
  const categorizedUsers: ICategorizedUsers = {
    hosts: [],
    vendors: [],
    guests: [],
  };

  users.forEach((user: any) => {
    if (event.host.some((hostId) => hostId.equals(user._id))) {
      categorizedUsers.hosts.push(user);
    } else if (event.vendors.some((vendorId) => vendorId.equals(user._id))) {
      categorizedUsers.vendors.push(user);
    } else {
      categorizedUsers.guests.push(user);
    }
  });

  return res.status(StatusCodes.OK).json({
    event,
    msg: "Users categorized by role",
    users: categorizedUsers,
  });
};

const getMyEvent = async (req: Request, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  console.log(userId);
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
  const userId = req.user.userId;
  console.log(userId);
  const events = await Event.find({
    host: { $ne: userId },
    $or: [{ users: userId }],
  }).populate("users host vendors subEvents");

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
  getMyEventAsGuest,
};
