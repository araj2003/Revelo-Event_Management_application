import { Request, Response } from "express";
import Event from "../models/Server";
// import SubEvent from "../models/SubEvent";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { StatusCodes } from "http-status-codes";
import ServerInvite from "../models/ServerInvite";
import mongoose from "mongoose";
import User from "../models/User";

const createInvite = async (req: Request, res: Response) => {
  let { eventId, oneTimeUse, expiryDateb } = req.body;
  oneTimeUse = false;
  expiryDateb = null;
  const userId = req.user.userId;
  const event = await Event.findById(eventId);
  if (!event) {
    throw new BadRequestError("Event not found");
  }
  const inviteCode = Math.random().toString(36).substring(7);

  let serverInvite: {
    eventId: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    inviteCode: string;
    oneTimeUse: boolean;
    expiryDate?: Date;
  } = {
    eventId: event._id,
    createdBy: userId,
    inviteCode,
    oneTimeUse,
  };
  if (expiryDateb) {
    let expiryDate;
    try {
      expiryDate = new Date(expiryDateb);
    } catch (error) {
      throw new BadRequestError("Invalid date format");
    }
    serverInvite = { ...serverInvite, expiryDate };
  }

  const invite = await ServerInvite.create(serverInvite);
  return res.status(StatusCodes.CREATED).json({
    invite,
    msg: "new invite created",
  });
};

const getInvite = async (req: Request, res: Response) => {
  const { inviteId } = req.body;
  const userId = req.user.userId;

  const invite = await ServerInvite.find({ _id: inviteId, createdBy: userId });

  if (!invite) {
    throw new BadRequestError("invite not found");
  }

  return res.status(StatusCodes.OK).json({
    invite,
    msg: "list of all the invites",
  });
};

const getAllInvites = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  const invites = await ServerInvite.find({ createdBy: userId });

  res.status(StatusCodes.OK).json({
    invites,
  });
};

const joinInvite = async (req: Request, res: Response) => {
  const { inviteCode } = req.body;
  const userId = req.user.userId;

  console.log(inviteCode);
  const invite = await ServerInvite.findOne({ inviteCode });

  if (!invite) {
    throw new BadRequestError("invite not found");
  }

  if (invite.expired) {
    throw new BadRequestError("invite expired");
  }

  if (invite.oneTimeUse && invite.joinedUsers.includes(userId)) {
    throw new BadRequestError("invite already used");
  }
  if (invite.expiryDate && invite.expiryDate < new Date()) {
    invite.expired = true;
    await invite.save();
    throw new BadRequestError("invite expired");
  }

  const event = await Event.findById(invite.eventId);
  if (!event) {
    throw new BadRequestError("event not found");
  }
  const userAlreadyJoined = event.users.includes(userId);
  if (userAlreadyJoined) {
    throw new BadRequestError("user already joined");
  }
  event.users.push(userId);
  await event.save();
  const user = await User.findById(userId);
  if (!user) {
    throw new UnauthenticatedError("user not found");
  }
  user.joinedEvents.push(invite.eventId);
  await user.save();

  invite.joinedUsers.push(userId);
  if (invite.oneTimeUse) {
    invite.expired = true;
  }
  await invite.save();

  return res.status(StatusCodes.OK).json({
    invite,
    msg: "invite joined",
  });
};

export { createInvite, getInvite, getAllInvites, joinInvite };
