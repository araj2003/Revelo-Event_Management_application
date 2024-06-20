import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../types/models";

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [50, "Name must be at most 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide name"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid email",
      ],
      unique: true,
      index: true,
    },
    profilePicture: {
      type: String,
      //based on name "https://ui-avatars.com/api/?name={name}"
    },
    password: {
      type: String,
      minLength: [6, "Password must be at least 6 characters"],
    },
    isAdministrator: {
      type: Boolean,
      default: false,
    },
    isActivated: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: [true, "role must be defined"],
      enum: ["vendor", "regular"],
      default: "regular",
    },

    subroll: {
      type: String,
      required: function () {
        return this.role === "vendor";
      },
    },
    joinedEvents: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
      ],
      default: [],
    },
    //if vendor
  },
  { timestamps: true },
);

const preSave = async function (this: any, next: (err?: Error) => void) {
  if (this.profilePicture === undefined) {
    this.profilePicture = `https://ui-avatars.com/api/?name=${this.name}`;
  }

  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    return next(error);
  }
};

UserSchema.pre("save", preSave);

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET ?? "secret-string",
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  );
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
