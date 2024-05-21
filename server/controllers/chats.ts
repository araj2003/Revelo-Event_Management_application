import { Request, Response } from "express";
import User from "../models/User";
import Chat from "../models/Chat";
import { BadRequestError, UnauthenticatedError } from "../errors";

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
    res.json(isChat[0]);
  } else {
    var chatData = {
      isGroupChat: false,
      chatName: "sender",
      users: [req.user.userId, senderId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password",
      );

      res.status(200).json({ fullChat, msg: "new chat created" });
    } catch (error) {
      res.json({
        msg: "error in creating new chat",
        error: error,
      });
    }
  }
};

// create group(add users from subevent id)
const createGrupChat = async(req: Request, res: Response) => {
    const {groupName,allUsers,channelId} = req.body
    if (!groupName || !allUsers) {
        return res.status(400).send({
            message: "please fill the fields"
        });
    }

    var users = JSON.parse(allUsers);
    if (users.length < 2) {
        return res.status(400).json("more than 2 users to form a group chat");
    }

    // Extract user IDs and add them to the array
    users.push(req.user.userId);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            channelId:channelId,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user.userId
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json({
          groups:fullGroupChat,
          msg:"group chat created"
        });
    } catch (error) {
        res.status(500).json({
            msg: "cannot create group chat",
            error: error
        });
    }
}

//get single chat
// const getSingleChat = async(req: Request, res: Response) => {

// }



//get all chat
const getAllChats = async(req: Request, res: Response) => {
  try {
    await Chat.find({users:{$elemMatch:{$eq:req.user.userId}}})
    .populate("users","-password")
    .populate("groupAdmin","-password")
    .populate("latestMessage")
    .sort({updatedAt:-1})
    .then(async(results:any)=> {
        results = await User.populate(results,{
            path:"latestMessage.sender",
            select:"name email profilePicture role"
        })

        res.status(200).send(results)
    })
} catch (error) {
    res.json({
        msg:"error getting chats",
        error:error
    })
  }
}

export = {
  createGrupChat,createSingleChat,getAllChats
}
