//create a event
import { Request, Response } from "express";
import User from "../models/User";
import { BadRequestError, UnauthenticatedError } from "../errors";
import SubEvent from "../models/SubEvent";
import Event from "../models/Server";

import { StatusCodes } from "http-status-codes";
import { IServer, ISubEvent } from "../types/models";

const createSubEvent = async (req: Request, res: Response) => {
  const { subEventName,eventId} = req.body;
  const userId = req.user.userId;
  const user = await User.findById(userId);

  if (!user) {
    throw new BadRequestError("user not found");
  }

  const event : any = await Event.find({ _id: eventId, host: userId });

  if(!event){
    throw new BadRequestError("event not found");

  }
  

  const subEvent : any = new SubEvent({
    subEventName,
    users: [userId],
    admin: [userId],
    
  });

  await subEvent.save()

  const updatedEvent = await Event.findOneAndUpdate(
    { _id: eventId },
    { $push: { subEvents: subEvent._id } },
    { new: true }
  );


  return res.status(StatusCodes.CREATED).json({
    subEvent:subEvent,
    updatedEvent:updatedEvent,
    msg: "New SubEvent created",
  });
};

const getSubEvent = async (req: Request, res: Response) => {
  const {subEventId} = req.body;
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
  const { subEventId } = req.body;
  const userId = req.user.userId;

  console.log(subEventId);
  const subEvent = await SubEvent.find({ _id: subEventId, users: userId }).populate("channels");

  if (!subEvent) {
    throw new BadRequestError("event not found");
  }

  return res.status(500).json({
    subEvent,
    msg: "list of all the events",
  });
}



export { getAllChannels,addAdmin, getSubEvent, createSubEvent, removeAdmin, deleteSubEvent };
