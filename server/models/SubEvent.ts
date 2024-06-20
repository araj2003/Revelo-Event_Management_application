import mongoose from "mongoose";
import { ISubEvent } from "../types/models";

const SubEventSchema = new mongoose.Schema<ISubEvent>({
  // const SubEventSchema = new mongoose.Schema<any>({
  //server == wedding
  subEventName: {
    type: String,
    required: [true, "subEvent name is required"],
  },
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  admin: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  //channels
  channels: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Channel",
    },
  ],
  subEventDate: {
    type: Date,
    required: [true, "please provide date"],
  },
  subEventTime: {
    type: Date,
    required: [true, "please provide time"],
  },
  rsvp: {
    title: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    userIds: {
      accepted: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      ],
      rejected: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      ],
    },
  },
});

const SubEvent = mongoose.model("SubEvent", SubEventSchema);
export default SubEvent;
