//create a event
import { Request, Response } from "express";
import User from "../models/User";
import { BadRequestError, UnauthenticatedError } from "../errors";
import SubEvent from "../models/SubEvent";
import Event from "../models/Server";

import { StatusCodes } from "http-status-codes";
import { IServer, ISubEvent } from "../types/models";
import mongoose from "mongoose";

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
  const subEvent = await SubEvent.find({
    _id: subEventId,
    users: userId,
  }).populate("channels");

  if (!subEvent) {
    throw new BadRequestError("event not found");
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
  console.log(subEventId)

  const { userId } = req.body;
  console.log(userId)
  const subEvent = await SubEvent.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }
  if(subEvent.users.includes(userId)){
    throw new BadRequestError("user already present")
  }
  subEvent.users.push(userId)
  console.log(subEvent)
  await subEvent.save()

  return res.status(200).json({ subEvent, msg: "User added to subEvent" });
};

const removeUsersFromSubEvent = async (req: Request, res: Response) => {
  const { subEventId } = req.params;
  const { userIds } = req.body;

  // Find the subEvent
  const subEvent = await SubEvent.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }

  // Convert string user IDs to ObjectId instances
  const usersToRemove = userIds.map(
    (userId: string) => new mongoose.Types.ObjectId(userId),
  );

  subEvent.users = subEvent.users.filter(
    (userId) => !usersToRemove.includes(userId),
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
  const array = await User.find({ _id: { $in: usersNotInSubEvent } });
  return res.status(200).json({
    usersNotInSubEvent: array,
    msg: "users you want to add in subevebnt",
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
  removeUsersFromSubEvent,
  getUsersNotInSubEvent,
};
