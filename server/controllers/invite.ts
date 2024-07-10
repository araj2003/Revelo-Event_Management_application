import { Request, Response } from "express";
import Event from "../models/Server";
// import SubEvent from "../models/SubEvent";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { StatusCodes } from "http-status-codes";
import ServerInvite from "../models/ServerInvite";
import PersonalInvite from "../models/PersonalInvite";
import mongoose from "mongoose";
import User from "../models/User";
import Notification from "../models/Notification";

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

const sendPersonalInvite = async (req: Request, res: Response) => {
  const { eventId, userId } = req.body;
  const createdBy = req.user.userId;

  const event = await Event.findById(eventId);
  if (!event) {
    throw new BadRequestError("Event not found");
  }
  if (!event.host.includes(createdBy)) {
    throw new BadRequestError("Only host can send personal invites");
  }
  if (
    event.users.includes(userId) ||
    event.host.includes(userId) ||
    event.vendors.includes(userId)
  ) {
    throw new BadRequestError("User already joined the event");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new BadRequestError("User not found");
  }

  await PersonalInvite.deleteMany({ eventId, userId });

  const personalInvite = await PersonalInvite.create({
    eventId,
    createdBy,
    userId,
  });
  personalInvite.save();

  const notifications = await Notification.create({
    userId: userId,
    message: `You have been invited to the event ${event?.serverName}`,
    url: `/`,
  });

  return res.status(StatusCodes.CREATED).json({
    personalInvite,
    msg: "personal invite sent",
  });
};

const getAllPersonalInvitesReceived = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const personalInvites = await PersonalInvite.find({
    userId,
    response: "pending",
  })
    .populate({ path: "eventId", select: "serverName description" })
    .populate({ path: "createdBy", select: "name -_id" });
  return res.status(StatusCodes.OK).json({
    personalInvites,
    msg: "list of all the personal invites",
  });
};

const getAllPersonalInvitesSent = async (req: Request, res: Response) => {
  const createdBy = req.user.userId;
  // get eventName and createdBy user name
  const personalInvites = await PersonalInvite.find({
    createdBy,
    response: "pending",
  });

  return res.status(StatusCodes.OK).json({
    personalInvites,
    msg: "list of all the personal invites",
  });
};

const respondToPersonalInvite = async (req: Request, res: Response) => {
  const { inviteId, response } = req.body;
  const userId = req.user.userId;

  const personalInvite = await PersonalInvite.findById(inviteId);
  // console.log(personalInvite);
  if (!personalInvite) {
    throw new BadRequestError("personal invite not found");
  }
  if (personalInvite.userId.toString() !== userId.toString()) {
    throw new BadRequestError("user not authorized to respond to this invite");
  }

  if (response !== "accept" && response !== "reject") {
    throw new BadRequestError("invalid response");
  }

  const event = await Event.findById(personalInvite.eventId);
  if (!event) {
    throw new BadRequestError("event not found");
  }

  personalInvite.response = response;
  await personalInvite.save();

  const user = await User.findById(userId);
  if (!user) {
    throw new UnauthenticatedError("User not found");
  }
  if (response === "accept") {
    const userAlreadyJoined = event.users.includes(userId);
    const vendorAlreadyJoined = event.vendors.includes(userId);
    if (userAlreadyJoined || vendorAlreadyJoined) {
      throw new BadRequestError("User already joined the event");
    }
    if (user.role === "vendor") {
      event.vendors.push(userId);
    } else {
      event.users.push(userId);
    }
    await event.save();
  }

  return res.status(StatusCodes.OK).json({
    personalInvite,
    msg: response === "accept" ? "invite accepted" : "invite rejected",
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
  const vendorAlreadyJoined = event.vendors.includes(userId);
  if (userAlreadyJoined || vendorAlreadyJoined) {
    throw new BadRequestError("User already joined the event");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new UnauthenticatedError("User not found");
  }

  if (user.role === "vendor" && !event.vendors.includes(userId)) {
    event.vendors.push(userId);
  } else {
    event.users.push(userId);
  }
  await event.save();
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

export {
  createInvite,
  getInvite,
  getAllInvites,
  joinInvite,
  sendPersonalInvite,
  getAllPersonalInvitesReceived,
  getAllPersonalInvitesSent,
  respondToPersonalInvite,
};
