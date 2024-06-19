import mongoose from "mongoose";
import { IPersonalInvite } from "../types/models";

const PersonalInviteSchema = new mongoose.Schema<IPersonalInvite>(
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
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    response: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true },
);

const PersonalInvite = mongoose.model("PersonalInvite", PersonalInviteSchema);
export default PersonalInvite;
