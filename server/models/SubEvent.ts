import mongoose from "mongoose";
import { ISubEvent } from "../types/models";

const subEventSchema = new mongoose.Schema<ISubEvent>({
  //server == wedding
  subEventName: {
    type:String,
    required:[true,"server name is required"]
  },

  users: [{
    type:mongoose.Schema.ObjectId,
    ref:'User'
  }],
  admin: [{
    type:mongoose.Schema.ObjectId,
    ref:'User'
  }],
  //channels
  channels: [{
    type:mongoose.Schema.ObjectId,
    ref:'Channel'
  }],
});


module.exports = mongoose.model("SubEvent", subEventSchema);