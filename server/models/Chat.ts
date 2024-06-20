import mongoose from "mongoose";
import { IChat } from "../types/models";

export const ChatSchema = new mongoose.Schema<IChat>(
  {
    chatName: {
      type: String,
      trim: true,
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
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
    groupAdmin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
