import mongoose from "mongoose";

import { IChannel } from "../types/models";

const channel = new mongoose.Schema<IChannel>(
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

const channelSchema = mongoose.model("Channel", channel);
export default channelSchema;