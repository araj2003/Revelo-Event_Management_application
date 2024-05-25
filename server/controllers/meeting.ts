import { Request, Response } from "express";
import User from "../models/User";
import Chat from "../models/Chat";
import { BadRequestError, UnauthenticatedError } from "../errors";
import Message from "../models/Message";
import Meeting from "../models/meeting";

const createMeeting = async (req: Request, res: Response) => {
  const { channelId, topic, startTime, startDate, description } = req.body;

  if (!channelId || !topic || !startTime || !startDate) {
    throw new BadRequestError("Please provide complete imformation");
  }

  const meeting = new Meeting({
    channelId,
    topic,
    startTime,
    startDate,
    description,
  });

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
  const { channelId, topic, startTime, startDate, description } = req.body;

  const meeting = await Meeting.findById(meetingId);

  if (!meeting) {
    throw new BadRequestError("meeting cannot be Updated");
  }

  if (channelId) meeting.channelId = channelId;
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

export { createMeeting, getMeeting, updateMeeting };
