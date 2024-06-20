import { Request, Response } from "express";
import User from "../models/User";
import Chat from "../models/Chat";
import { BadRequestError, UnauthenticatedError } from "../errors";
import Message from "../models/Message";
import Meeting from "../models/meeting";

const createMeeting = async (req: Request, res: Response) => {
  const { meetingData } = req.body;
  // console.log(meetingData)
  if (!meetingData) {
    throw new BadRequestError("Please provide complete imformation");
  }

  const userId = req.user.userId;

  const meeting = new Meeting({
    topic: meetingData.topic,
    startTime: meetingData.startTime,
    startDate: meetingData.startDate,
    description: meetingData.description,
    userId: [userId],
  });

  meeting.userId.push(meetingData.guestId);

  await meeting.save();

  if (!meeting) {
    throw new BadRequestError("meeting cannot be created");
  }

  res.status(200).json({
    msg: "new meeting created",
    meeting,
  });
};

const updateMeeting = async (req: Request, res: Response) => {
  const meetingId = req.params.id;
  if (!meetingId) {
    throw new BadRequestError("Please provide complete imformation");
  }
  const { topic, startTime, startDate, description } = req.body;

  const meeting = await Meeting.findById(meetingId);

  if (!meeting) {
    throw new BadRequestError("meeting cannot be Updated");
  }

  if (topic) meeting.topic = topic;
  if (startTime) meeting.startTime = startTime;
  if (startDate) meeting.startDate = startDate;
  if (description) meeting.description = description;

  const updatedMeeting = await meeting.save();
  res.status(200).json({
    updatedMeeting,
    msg: "meeting updated succesfully",
  });
};

const getMeeting = async (req: Request, res: Response) => {
  const meetingId = req.params.id;
  if (!meetingId) {
    throw new BadRequestError("Please provide complete imformation");
  }

  const meeting = await Meeting.findById(meetingId);

  if (!meeting) {
    throw new BadRequestError("meeting not found");
  }

  res.status(200).json({
    meeting,
    msg: "meeting found",
  });
};

const getMeetingsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const meetings = await Meeting.find({ userId: { $in: [userId] } })
      .populate("channelId", "name")
      .exec();

    if (!meetings || meetings.length === 0) {
      return res
        .status(404)
        .json({ message: "No meetings found for the provided user ID" });
    }

    res.status(200).json(meetings);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching meetings" });
  }
};

export { createMeeting, getMeeting, updateMeeting, getMeetingsByUserId };
