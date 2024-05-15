import mongoose from "mongoose";

import { IChannel } from "../types/models";

const channelSchema = new mongoose.Schema<IChannel>(
  {
    channelName:{
        type:String,
        required:[true,"channel name required"]
    },
    chats:[{
        type:mongoose.Types.ObjectId,
        ref:'Chat',

    }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Channel", channelSchema);
