import mongoose from "mongoose";
import { IServer } from "../types/models";

const serverSchema = new mongoose.Schema<IServer>({
  //server == wedding
  serverName: {
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


module.exports = mongoose.model("Server", serverSchema);