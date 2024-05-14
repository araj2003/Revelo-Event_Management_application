import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  profilePicture?: string;
  password?: string;
  isAdministrator: Boolean;
  isActivated: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
  role?: string;
  createJWT: () => string;
  comparePassword: (candidatePassword: string) => Promise<Boolean>;
}

export interface IServer {
  _id?:mongoose.Types.ObjectId;
  serverName:string;
  users:mongoose.Types.ObjectId[];
  admin:mongoose.Types.ObjectId[];
  chats:mongoose.Types.ObjectId[];
}

export interface IChat{
  _id?:mongoose.Types.ObjectId;
  chatName:string;
  chatTag:string;
  isGroupChat:boolean;
  users:mongoose.Types.ObjectId[];
  latestMessage:mongoose.Types.ObjectId;
  groupAdmin:mongoose.Types.ObjectId[];

}

export interface IMessage{
  _id?:mongoose.Types.ObjectId;
  sender:mongoose.Types.ObjectId;
  content:string;
  readBy:mongoose.Types.ObjectId[];
  chat:mongoose.Types.ObjectId;
}

