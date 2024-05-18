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
  host: [{
    type:mongoose.Schema.ObjectId,
    ref:'User'
  }],
  //subEvents
  subEvents: [{
    type:mongoose.Schema.ObjectId,
    ref:'SubEvent'
  }],
});


const eventSchemma = mongoose.model("Server", serverSchema);
export default eventSchemma;