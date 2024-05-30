import { Request, Response } from "express";
import User from "../models/User";
import Chat from "../models/Chat";
import { BadRequestError, UnauthenticatedError } from "../errors";
import Message from "../models/Message";

const sendMessage = async (req: Request, res: Response) => {
  const { content, chatId } = req.body;
  console.log(req.body)
  if (!content || !chatId) {
    throw new BadRequestError("Please provide the content and chatId");
  }
  
  var newMessage = {
    sender: req.user.userId,
    content: content,
    chat: chatId,
  };

  try {
    const message = await Message.create(newMessage);
    const populatedMessage = await Message.populate(message, {
      path: "sender readBy chat",
      model: "User",
    });

    await populatedMessage.save();
    await Chat.findByIdAndUpdate(chatId, { latestMessage: populatedMessage });
    return res.status(200).json(populatedMessage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "not able to send the message",

      error: error,
    });
  }
};

const getMessage = async (req: Request, res: Response) => {
  try {
    const {chatId } = req.params;

    var messages = await Message.find({ chat: chatId })
      .populate("sender", "user_name profile_pic email")
      .populate("chat");
    console.log(messages);
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export { sendMessage, getMessage };
