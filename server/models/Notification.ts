import mongoose from "mongoose";

import { INotification } from "../types/models";

const NotificationSchema = new mongoose.Schema<INotification>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: { 
        type: String, 
        required: true 
    },
    seen: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    url: { 
        type: String, 
        required: false 
    },
    
  },
  { timestamps: true },
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
