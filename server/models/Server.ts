import mongoose from "mongoose";
import { IServer } from "../types/models";

const serverSchema = new mongoose.Schema<IServer>({
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
  chats: [{
    type:mongoose.Schema.ObjectId,
    ref:'Chat'
  }],
});


module.exports = mongoose.model("Server", serverSchema);