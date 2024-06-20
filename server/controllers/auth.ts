import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { CookieOptions, Request, Response } from "express";
import { IUser } from "../types/models";
import { uploadProfileImage } from "../utils/cloudinary";
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

const setTokenCookie = (res: Response, user: IUser) => {
  const token = user.createJWT();
  // stored as 30d
  const JWT_LIFETIME = process.env.JWT_LIFETIME as string;
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(
      Date.now() + parseInt(JWT_LIFETIME) * 24 * 60 * 60 * 1000,
    ),
  });
};

const register = async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    throw new BadRequestError("Please provide name, email and password");
  }
  const user: IUser = await User.create({ ...req.body });

  setTokenCookie(res, user);

  return res.status(StatusCodes.CREATED).json({
    name: user.name,
    id: user._id,
    isAdministrator: user.isAdministrator ?? false,
    profilePicture: user.profilePicture,
    msg: "Registration successful",
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  if (!user.password)
    throw new UnauthenticatedError(
      "Please login with Google.\nOr Reset Password.",
    );

  // compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  setTokenCookie(res, user);

  return res.status(StatusCodes.OK).json({
    name: user.name,
    id: user._id,
    isAdministrator: user.isAdministrator ?? false,
    profilePicture: user.profilePicture,
    msg: "Login successful",
  });
};

const continueWithGoogle = async (req: Request, res: Response) => {
  const tokenId = req.body.tokenId;

  let payload: any = null;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (error) {
    console.log(error);
    throw new BadRequestError("Invalid Token");
  }

  const { email, name, picture } = payload;
  let user = await User.findOne({ email });
  if (user) {
  } else {
    user = await User.create({
      email,
      name,
      profileImage: picture,
      status: "active",
    });
  }
  setTokenCookie(res, user);
  res.status(StatusCodes.CREATED).json({
    success: true,
    name: user.name,
    id: user._id,
    isAdministrator: user.isAdministrator ?? false,
    profilePicture: user.profilePicture,
    msg: "Google Login Successfully",
  });
};

const sendDetails = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) {
    throw new UnauthenticatedError("Unauthorized");
  }

  setTokenCookie(res, user);

  return res.status(StatusCodes.OK).json({
    name: user.name,
    id: user._id,
    isAdministrator: user.isAdministrator ?? false,
    profilePicture: user.profilePicture,
    msg: "User details sent",
  });
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(StatusCodes.OK).json({
    msg: "Logout successful",
  });
};

const profile = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  const user = await User.findById(userId).select(
    "email name profilePicture -_id",
  );
  if (!user) {
    throw new UnauthenticatedError("Unauthorized");
  }
  return res.status(StatusCodes.OK).json({
    user,
    msg: "User details sent",
  });
};

const updateProfile = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) {
    throw new UnauthenticatedError("Unauthorized");
  }
  const { name } = req.body;
  user.name = name;
  await user.save();
  const { email, profilePicture: pp } = user;
  return res.status(StatusCodes.OK).json({
    user: { email, name, profilePicture: pp },
    msg: "Profile updated successfully",
  });
};

const passwordChange = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) {
    throw new UnauthenticatedError("Unauthorized");
  }
  const { currentPassword, newPassword } = req.body;
  const isPasswordCorrect = await user.comparePassword(currentPassword);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid current password");
  }
  user.password = newPassword;
  await user.save();
  return res.status(StatusCodes.OK).json({
    msg: "Password changed successfully",
  });
};

const uploadProfilePicture = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) {
    throw new UnauthenticatedError("Unauthorized");
  }
  const cloudinary_url = await uploadProfileImage(req);
  user.profilePicture = cloudinary_url;
  await user.save();
  const { email, name, profilePicture } = user;
  return res.status(StatusCodes.OK).json({
    user: { email, name, profilePicture },
    msg: "Profile picture uploaded successfully",
  });
};

export {
  register,
  login,
  logout,
  continueWithGoogle,
  sendDetails,
  profile,
  passwordChange,
  updateProfile,
  uploadProfilePicture,
};
