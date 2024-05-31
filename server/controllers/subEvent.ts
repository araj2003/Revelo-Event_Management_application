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

  const subEvent: any = new SubEvent({
    subEventName: subEventName,
    users: [userId],
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

  return res.status(200).json({ subEvent, msg: "User added to subEvent" });
};

const removeUserFromSubEvent = async (req: Request, res: Response) => {
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

  return res.status(200).json({ subEvent, msg: "Users removed from subEvent" });
};

const getUsersNotInSubEvent = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  const subEventId = req.params.subEventId;

  // Find the event by its ID and populate the users field
  const event = await Event.findById(eventId);

  // Find the subevent by its ID and populate the users field
  const subEvent = await SubEvent.findById(subEventId);

  if (!event || !subEvent) {
    throw new BadRequestError("Event or SubEvent not found");
  }

  // Get the user IDs from the event
  const eventUserIds = event.users.map((user) => user._id.toString());
  // Get the user IDs from the subevent
  const subEventUserIds = subEvent.users.map((user) => user._id.toString());
  // Find users present in the event but not in the subevent
  const usersNotInSubEvent = eventUserIds.filter(
    (userId) => !subEventUserIds.includes(userId),
  );

  const usersInSubEvent = eventUserIds.filter(
    (userId) =>
      userId !== req.user.userId.toString() && subEventUserIds.includes(userId),
  );

  const notInSubEvent = await User.find({ _id: { $in: usersNotInSubEvent } });
  const inSubEvent = await User.find({ _id: { $in: usersInSubEvent } });
  return res.status(200).json({
    usersNotInSubEvent: notInSubEvent,
    usersInSubEvent: inSubEvent,
    msg: "users you want to add in subevebnt",
  });
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
