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
    chat: {
      type: ChatSchema,
      default: {
        isGroupChat: true,
        users: [],
        groupAdmin: [],
      },
    },
  },
  { timestamps: true },
);

const preSave = async function (this: any, next: (err?: Error) => void) {
  if (this.chat === undefined) {
    const chat = new Chat({
      chatName: this.channelName,
      channelId: this._id,
      isGroupChat: true,
    });
    this.chat = chat;
  }
  next();
}

ChannelSchema.pre("save",preSave);

const Channel = mongoose.model("Channel", ChannelSchema);
export default Channel;
