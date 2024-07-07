//create a event
import { Request, Response } from "express";
import User from "../models/User";
import { BadRequestError, UnauthenticatedError } from "../errors";
import SubEvent from "../models/SubEvent";
import Event from "../models/Server";
import Channel from "../models/Channel";
import Chat from "../models/Chat";
import { StatusCodes } from "http-status-codes";
import { IServer, ISubEvent } from "../types/models";
import mongoose from "mongoose";
import { uploadRSVPImage } from "../utils/cloudinary";
import sendMail from "../utils/sendMail";
import Notification from "../models/Notification";


const createSubEvent = async (req: Request, res: Response) => {
  const { subEventName, eventId, subEventDate, subEventTime } = req.body;
  console.log(subEventName);
  const userId = req.user.userId;
  const user = await User.findById(userId);

  if (!user) {
    throw new BadRequestError("user not found");
  }

  const event: any = await Event.find({ _id: eventId, host: userId });

  if (!event) {
    throw new BadRequestError("event not found");
  }

  const hosts = event.hosts || [];
  if (!hosts.includes(userId)) {
    hosts.push(userId);
  }

  console.log(hosts);

  const subEvent = new SubEvent({
    subEventName: subEventName,
    users: hosts, 
    admin: [userId], 
    subEventDate: subEventDate,
    subEventTime: subEventTime,
  });

  await subEvent.save();

  const updatedEvent = await Event.findOneAndUpdate(
    { _id: eventId },
    { $push: { subEvents: subEvent._id } },
    { new: true },
  );

  return res.status(StatusCodes.CREATED).json({
    subEvent: subEvent,
    updatedEvent: updatedEvent,
    msg: "New SubEvent created",
  });
};

const getSubEvent = async (req: Request, res: Response) => {
  const { subEventId } = req.body;
  const subEvent = await SubEvent.findById(subEventId);

  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }

  return res.status(StatusCodes.OK).json({
    subEvent,
    msg: "SubEvent successfully fetched",
  });
};

const addAdmin = async (req: Request, res: Response) => {
  const { adminId, subEventId } = req.body;
  if (!adminId || !subEventId) {
    throw new BadRequestError("Please provide adminId and subEventId");
  }
  const subEvent = await SubEvent.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }
  subEvent.admin.push(adminId);
  return res.status(StatusCodes.OK).json({
    subEvent,
    msg: "Admin added successfully",
  });
};

const removeAdmin = async (req: Request, res: Response) => {
  const { adminId, subEventId } = req.body;
  if (!adminId || !subEventId) {
    throw new BadRequestError("Please provide adminId and subEventId");
  }
  const subEvent = await SubEvent.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }
  const index = subEvent.admin.indexOf(adminId);
  if (index > -1) {
    subEvent.admin.splice(index, 1);
  }
  return res.status(StatusCodes.OK).json({
    subEvent,
    msg: "Admin removed successfully",
  });
};

const deleteSubEvent = async (req: Request, res: Response) => {
  const { subEventId } = req.body;
  if (!subEventId) {
    throw new BadRequestError("Please provide subEventId");
  }
  const subEvent = await SubEvent.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }

  const response = await SubEvent.deleteOne({ _id: subEvent._id });

  return res.status(StatusCodes.OK).json({
    response,
    msg: "SubEvent deleted successfully",
  });
};

const getAllChannels = async (req: Request, res: Response) => {
  const { subEventId } = req.params;
  const userId = req.user.userId;

  console.log(subEventId);
  const subEvent = await SubEvent.findOne({
    _id: subEventId,
    users: userId,
  }).populate("channels");

  if (!subEvent) {
    throw new BadRequestError("You are not a part of this subevent");
  }

  return res.status(200).json({
    subEvent,
    msg: "list of all the events",
  });
};

const updateSubEvent = async (req: Request, res: Response) => {
  const { subEventId } = req.params;
  const updatedSubEvent = req.body;

  // Find the sub-event by its ID and update it
  const updatedSubEventData = await SubEvent.findByIdAndUpdate(
    subEventId,
    updatedSubEvent,
    { new: true },
  );

  if (!updatedSubEventData) {
    throw new BadRequestError("subevent cannot be updated");
  }

  res.status(200).json({ updatedSubEventData, msg: "subevent updated" });
};

const addUserToSubEvent = async (req: Request, res: Response) => {
  const { subEventId } = req.params;
  const {eventId} = req.params
  const { userId } = req.body;

  const subEvent = await SubEvent.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }

  if (subEvent.users.includes(userId)) {
    throw new BadRequestError("User already present");
  }

  subEvent.users.push(userId);

  const channels = await Channel.find({ _id: { $in: subEvent.channels } });

  for (const channel of channels) {
    const chat = await Chat.findById(channel.chatId);
    if (chat) {
      chat.users.push(userId);
      await chat.save();
    }
  }

  

  await subEvent.save();
  const notifications = await Notification.create({
    userId: userId,
    message: `You have been added to subevent ${subEvent?.subEventName}`,
    url: `event/${eventId}`,
  });

  console.log(notifications);

  return res.status(200).json({ subEvent, msg: "User added to subEvent" });
};

const removeUserFromSubEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const { subEventId } = req.params;
  const { userId: rmUserId } = req.body;

  console.log(subEventId, rmUserId);

  // Find the subEvent
  const subEvent = await SubEvent.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }

  subEvent.users = subEvent.users.filter(
    (userId) => userId.toString() !== rmUserId,
  );
  subEvent.admin = subEvent.admin.filter(
    (userId) => userId.toString() !== rmUserId,
  );
  await subEvent.save();

  const notifications = await Notification.create({
    userId: rmUserId,
    message: `You have been removed from subevent ${subEvent?.subEventName}`,
    url: `event/${eventId}`,
  });

  return res.status(200).json({ subEvent, msg: "Users removed from subEvent" });
};

const getUsersNotInSubEvent = async (req: Request, res: Response) => {
  const { eventId, subEventId } = req.params;

  try {
    // Fetch event and subevent in parallel
    const [event, subEvent] = await Promise.all([
      Event.findById(eventId).populate('users vendors host'),
      SubEvent.findById(subEventId).populate('users'),
    ]);

    if (!event || !subEvent) {
      return res.status(404).json({ message: "Event or SubEvent not found" });
    }

    // Consolidate all user IDs from the event
    const eventUserIds = new Set([
      ...event.users.map(user => user._id.toString()),
      ...event.vendors.map(vendor => vendor._id.toString()),
      ...event.host.map(host => host._id.toString()),
    ]);

    // Get user IDs from the subevent
    const subEventUserIds = new Set(subEvent.users.map(user => user._id.toString()));

    // Determine users not in subevent
    const usersNotInSubEventIds = [...eventUserIds].filter(id => !subEventUserIds.has(id));

    // Determine users in subevent
    const usersInSubEventIds = [...eventUserIds].filter(id => subEventUserIds.has(id));

    // Fetch user details for both sets in parallel
    const [usersNotInSubEvent, usersInSubEvent] = await Promise.all([
      User.find({ _id: { $in: usersNotInSubEventIds } }),
      User.find({ _id: { $in: usersInSubEventIds } }),
    ]);

    // Return the response
    return res.status(200).json({
      usersNotInSubEvent,
      usersInSubEvent,
      message: "Users in and not in the subevent retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addRSVP = async (req: Request, res: Response) => {
  const { subEventId } = req.params;
  const { title, description } = req.body;
  if (!title || !description) {
    throw new BadRequestError("Please provide title and description");
  }
  const userId = req.user.userId;
  const subEvent = await SubEvent.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }
  console.log(subEvent);
  if (subEvent.rsvp?.title) {
    throw new BadRequestError("RSVP already present");
  }
  if (!subEvent.admin.includes(userId)) {
    throw new BadRequestError("You are not an admin");
  }
  const cloudinary_url = await uploadRSVPImage(req, subEvent._id);
  subEvent.rsvp = {
    title,
    description,
    image: cloudinary_url,
    userIds: {
      accepted: [],
      rejected: [],
    },
  };
  await subEvent.save();

  // send email to all users
  const users = await User.find({ _id: { $in: subEvent.users } });
  users.forEach(async (user) => {
    sendMail({
      from: process.env.SMTP_EMAIL_USER,
      to: user.email,
      subject: `RSVP for ${subEvent.subEventName}`,
      text: `Please RSVP for the event ${subEvent.subEventName}.`,
    });

    const event = await Event.find({subEvents: subEvent._id});
    const notifications = await Notification.create({
      userId: user._id,
      message: `Please RSVP for the event ${subEvent.subEventName}`,
      url: `/event/${event[0]._id}`,
    });

  });

  return res.status(200).json({ subEvent, msg: "RSVP added" });
};

const getRSVPList = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { subEventId } = req.params;
  const subEvent = await SubEvent.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }
  if (!subEvent.rsvp) {
    throw new BadRequestError("RSVP not found");
  }
  if (!subEvent.admin.includes(req.user.userId)) {
    throw new UnauthenticatedError("You are not an admin");
  }
  const users = await User.find({
    _id: { $in: subEvent.users, $nin: [userId] },
  });

  return res.status(200).json({
    users,
    msg: "RSVP list",
  });
};

const acceptRejectRSVP = async (req: Request, res: Response) => {
  const { subEventId } = req.params;
  const { status } = req.body;
  const userId = req.user.userId;
  const subEvent = await SubEvent.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }
  if (!subEvent.rsvp) {
    throw new BadRequestError("RSVP not found");
  }
  subEvent.rsvp.userIds.accepted = subEvent.rsvp.userIds.accepted.filter(
    (id) => id.toString() !== userId.toString(),
  );
  subEvent.rsvp.userIds.rejected = subEvent.rsvp.userIds.rejected.filter(
    (id) => id.toString() !== userId.toString(),
  );
  if (status === "accept") {
    subEvent.rsvp.userIds.accepted.push(userId);
  } else if (status === "reject") {
    subEvent.rsvp.userIds.rejected.push(userId);
  } else {
    throw new BadRequestError("Invalid status");
  }
  await subEvent.save();
  return res.status(200).json({ subEvent, msg: "RSVP updated" });
};

const hasAcceptedRSVP = async (req: Request, res: Response) => {
  const { subEventId } = req.params;
  const userId = req.user.userId;
  const subEvent = await SubEvent.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }
  if (!subEvent.rsvp) {
    throw new BadRequestError("RSVP not found");
  }
  const hasAccepted = subEvent.rsvp.userIds.accepted.includes(userId);
  const hasRejected = subEvent.rsvp.userIds.rejected.includes(userId);
  return res.status(200).json({
    status: hasAccepted ? "accept" : hasRejected ? "reject" : "pending",
    msg: "RSVP status",
  });
};

export {
  getAllChannels,
  addAdmin,
  getSubEvent,
  createSubEvent,
  removeAdmin,
  deleteSubEvent,
  updateSubEvent,
  addUserToSubEvent,
  removeUserFromSubEvent,
  getUsersNotInSubEvent,
  addRSVP,
  getRSVPList,
  acceptRejectRSVP,
  hasAcceptedRSVP,
};
