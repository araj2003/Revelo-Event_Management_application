import mongoose from "mongoose";
import { IServer } from "../types/models";

const ServerSchema = new mongoose.Schema<IServer>({
  //server == wedding
  serverName: {
    type: String,
    required: [true, "server name is required"],
  },
  description: {
    type: String,
    required: [true, "server name is required"],
    default: "No description provided",
  },
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  host: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  //subEvents
  subEvents: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "SubEvent",
    },
  ],
});

const Event = mongoose.model("Server", ServerSchema);
export default Event;
