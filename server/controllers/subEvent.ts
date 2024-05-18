//create a event
import { Request, Response } from "express";
import User from "../models/User";
import { BadRequestError, UnauthenticatedError } from "../errors";
import subEventSchema from "../models/SubEvent";
import { StatusCodes } from "http-status-codes";

const createSubEvent = async (req: Request, res: Response) => {
  const { subEventName, channelId } = req.body;
  const userId = req.user.userId;
  const user = await User.findById(userId);

  if (!user) {
    throw new BadRequestError("user not found");
  }

  const subEvent = new subEventSchema({
    subEventName,
    users: [userId],
    admin: [userId],
    channels: [channelId],
  });

  return res.status(StatusCodes.CREATED).json({
    subEvent,
    msg: "New SubEvent created",
  });
};

const getSubEvent = async (req: Request, res: Response) => {
  const subEventId = req.body;
  const subEvent = await subEventSchema.findById(subEventId);

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
  const subEvent = await subEventSchema.findById(subEventId);
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
  const subEvent = await subEventSchema.findById(subEventId);
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
  const subEvent = await subEventSchema.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("SubEvent not found");
  }

  const response = await subEventSchema.deleteOne({ _id: subEvent._id });

  return res.status(StatusCodes.OK).json({
    response,
    msg: "SubEvent deleted successfully",
  });
};

export { addAdmin, getSubEvent, createSubEvent, removeAdmin, deleteSubEvent };
