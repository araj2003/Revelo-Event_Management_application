import mongoose from "mongoose";
import { IChat } from "../types/models";

const chatSchema = new mongoose.Schema<IChat>(
  {
    chatName: {
      type: String,
      trim: true,
    },
    chatTag:{
        type: String,
      trim: true,
      default:"general"
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    },
    groupAdmin: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Chat", chatSchema);
