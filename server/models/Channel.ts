import mongoose from "mongoose";

import { IChannel } from "../types/models";
import Chat, { ChatSchema } from "./Chat";
import { NextFunction } from "express";

const ChannelSchema = new mongoose.Schema<IChannel>(
  {
    channelName: {
      type: String,
      required: [true, "Channel name required"],
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },

  { timestamps: true },
);

const preSave = async function (this: any, next: (err?: Error) => void) {
  if (this.chatId === undefined) {
    const chat = new Chat({
      chatName: this.channelName,
      channelId: this._id,
      isGroupChat: true,
    });
    await chat.save();
    console.log(chat);
    this.chatId = chat._id;
  }
  next();
};

ChannelSchema.pre("save", preSave);

const Channel = mongoose.model("Channel", ChannelSchema);
export default Channel;
