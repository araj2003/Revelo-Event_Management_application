import mongoose from "mongoose";

import { IMeeting } from "../types/models";

const MeetingSchema = new mongoose.Schema<IMeeting>(
  {
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    topic: {
      type: String,
      required: [true, "please provide topic"],
    },
    startTime: {
      type: Date,
      required: [true, "please provide time"],
    },
    description: {
      type: String,
      // required:[true,"please provide Description"]
    },
    startDate: {
      type: Date,
      required: [true, "please provide Date"],
    },
  },
  { timestamps: true },
);

const Meeting = mongoose.model("Meeting", MeetingSchema);
export default Meeting;
