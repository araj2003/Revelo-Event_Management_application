import { Request, Response } from "express";
import User from "../models/User";
import Chat from "../models/Chat";
import { BadRequestError, UnauthenticatedError } from "../errors";
import Message from "../models/Message";

const searchVendorRoll = async (req: Request, res: Response) => {
  const { subroll } = req.query;
  if (typeof subroll !== "string") {
    throw new BadRequestError("Invalid subroll query parameter");
  }
  const vendors = await User.find({ role: "vendor", subroll });
  return res.status(200).json({ vendors, msg: "list of all the vendors" });
};

export { searchVendorRoll };
