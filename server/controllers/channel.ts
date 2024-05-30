import { Request, Response } from "express";
import User from "../models/User";
import { BadRequestError, UnauthenticatedError } from "../errors";
import Channel from "../models/Channel";
import SubEvent from "../models/SubEvent";
import { StatusCodes } from "http-status-codes";
import Message from "../models/Message";
import Chat from "../models/Chat";

const createChannel = async (req: Request, res: Response) => {
  const { channelName, subEventId } = req.body;
  console.log(req.body);
  if (!channelName || !subEventId) {
    throw new BadRequestError("Please provide subevent id and channel name");
  }

  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) {
    throw new BadRequestError("user not found");
  }

  const subEvent: any = await SubEvent.findById(subEventId);
  if (!subEvent) {
    throw new BadRequestError("subEvent not found");
  }
//users
  const channel: any = new Channel({ 
    channelName:channelName,
   });
  if (!channel) {
    throw new BadRequestError("cannot create channel");
  }
  
  await channel.save();
  const chatId = channel.chatId
  const chat:any= await Chat.findById(chatId)
  chat.users = subEvent.users
  chat.groupAdmin = subEvent.admin
  await chat.save();

  const updatedSubEvent = await SubEvent.findOneAndUpdate(
    { _id: subEventId },
    { $push: { channels: channel._id } },
    { new: true }
  );

  return res.status(StatusCodes.CREATED).json({
    channel,
    updatedSubEvent,
    msg: "new channel created",
  });
};

const getChannel = async (req: Request, res: Response) => {
  const { channelId } = req.params;
  const channel :any= await Channel.findById(channelId);
  // const channel :any= await Channel.findById(channelId).populate("chatId");

  if (!channel) {
    throw new BadRequestError("channel not found");
  }
  console.log(channel.chatId)
  const messages = await Message.find({chat:channel.chatId}).sort({ createdAt: 1 });
  const msg = await Message.find({})
  // console.log(msg)
  return res.status(StatusCodes.OK).json({
    channel,
    messages,
    msg: "list of all the channels",
  });
};

export { getChannel, createChannel };
