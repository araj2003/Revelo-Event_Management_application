import mongoose from "mongoose";
import { IServerInvite } from "../types/models";

const ServerInviteSchema = new mongoose.Schema<IServerInvite>(
  {
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Server",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    inviteCode: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
    },
    joinedUsers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    oneTimeUse: {
      type: Boolean,
      default: false,
    },
    expired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const ServerInvite = mongoose.model("ServerInvite", ServerInviteSchema);
export default ServerInvite;
