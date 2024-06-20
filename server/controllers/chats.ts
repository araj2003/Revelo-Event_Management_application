import { Request, Response } from "express";
import User from "../models/User";
import Chat from "../models/Chat";
import { BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";
import Channel from "../models/Channel";
import { group } from "console";

//single chat
const createSingleChat = async (req: Request, res: Response) => {
  const { senderId } = req.body;
  const sender = await User.findById(senderId);

  if (!sender) {
    throw new BadRequestError("user not found");
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.userId } } },
      { users: { $elemMatch: { $eq: senderId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (isChat.length > 0) {
    res.json({ msg: "chat already exists", chat: isChat });
  } else {
    var chatData = {
      isGroupChat: false,
      chatName: "sender",
      users: [req.user.userId, senderId],
    };
    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password",
    );
    res.status(StatusCodes.CREATED).json({ fullChat, msg: "new chat created" });
  }
};

// create group(add users from subevent id)
const createGroupChat = async (req: Request, res: Response) => {
  const { groupName, allUsers, channelId } = req.body;
  if (!groupName || !allUsers) {
    throw new BadRequestError("Please provide group name and users");
  }

  var users = JSON.parse(allUsers);
  if (users.length < 2) {
    throw new BadRequestError("Please add more than one user");
  }

  const channel: any = Channel.findById(channelId);

  if (!channel) {
    throw new BadRequestError("chanel not found");
  }

  // Extract user IDs and add them to the array
  users.push(req.user.userId);

  const groupChat = await Chat.create({
    chatName: req.body.name,
    channelId: channelId,
    users: users,
    isGroupChat: true,
    groupAdmin: req.user.userId,
  });

  channel.chatId = groupChat._id;

  await channel.save();

  const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(StatusCodes.OK).json({
    groups: fullGroupChat,
    msg: "group chat created",
  });
};

//get single chat
// const getSingleChat = async(req: Request, res: Response) => {

// }

//get all chat
const getAllChats = async (req: Request, res: Response) => {
  await Chat.find({ users: { $elemMatch: { $eq: req.user.userId } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results: any) => {
      results = await User.populate(results, {
        path: "latestMessage.sender",
        select: "name email profilePicture role",
      });

      res.status(StatusCodes.OK).send(results);
    });
};

const getSingleChat = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  if (!userId) {
    throw new BadRequestError("please provide user");
  }
  const nonGroupChats = await Chat.find({
    isGroupChat: false,
    users: userId,
  })
    .populate("users", "-password")
    .populate("latestMessage");

  return res.status(200).json({ nonGroupChats, msg: "list of single chats" });
};

const getGroupChat = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  if (!userId) {
    throw new BadRequestError("please provide user");
  }
  const GroupChats = await Chat.find({
    isGroupChat: true,
    users: userId,
  })
    .populate("users", "-password")
    .populate("latestMessage")
    .populate("channelId");
  return res.status(200).json({ GroupChats, msg: "list of group chats" });
};

export {
  createGroupChat,
  createSingleChat,
  getAllChats,
  getSingleChat,
  getGroupChat,
};
