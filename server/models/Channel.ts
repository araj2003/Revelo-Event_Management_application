import mongoose from "mongoose";

import { IChannel } from "../types/models";

const ChannelSchema = new mongoose.Schema<IChannel>(
  {
    channelName: {
      type: String,
      required: [true, "Channel name required"],
    },
    chats: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Chat",
      },
    ],
  },
  { timestamps: true },
);

const Channel = mongoose.model("Channel", ChannelSchema);
export default Channel;
