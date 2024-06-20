import { Request } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { BadRequestError } from "../errors";
import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadProfileImage = async (req: Request) => {
  const { file } = req;
  if (!file) throw new BadRequestError("Please provide an image file");
  const userId = req.user.userId.toString();
  const result = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
    {
      folder: "event-manager/profile-images",
      public_id: userId,
      overwrite: true,
      format: "webp",
      invalidate: true,
    },
  );
  return result.secure_url;
};

const uploadRSVPImage = async (req: Request, subEventId: any) => {
  const { file } = req;
  if (!file) throw new BadRequestError("Please provide an image file");
  const result = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
    {
      folder: "event-manager/rsvp-images",
      public_id: subEventId.toString(),
      overwrite: false,
      format: "webp",
    },
  );
  return result.secure_url;
};

export { uploadProfileImage, uploadRSVPImage };
