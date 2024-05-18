import { Request, Response, response } from "express";
import User from "../models/User"
import eventSchemma from "../models/Server";
import { BadRequestError, UnauthenticatedError } from "../errors";
import channelSchema from "../models/Channel";
import subEventSchema from "../models/SubEvent";

const createChannel = async(req: Request, res: Response) => {
    const {channelName,subEventId} = req.body
    if(!channelName || !subEventId){
        throw new BadRequestError("Please provide hostId and eventId");
    }
    const userId = req.user.userId
    const user = await User.findById(userId)


    if(!user){
        throw new BadRequestError("user not found");
    }

    const subEvent = await subEventSchema.findById(subEventId)
    
    if(!subEvent){
        throw new BadRequestError("subEvent not found")
    }
    
    
    const channel = new channelSchema({
        channelName:channelName
    })
    if(!channel){
        throw new BadRequestError("cannot create channel");
    }

    subEvent.channels.push(channel._id)

    await subEvent.save()

    return res.status(500).json({
        channel:channel,
        subEvent:subEvent,
        msg:"new event created"
    })

}

const getChannel =  async (req: Request, res: Response) => {
    const channelId = req.body;
    const channel = await channelSchema.findById(channelId)

    if(!channel){
        throw new BadRequestError("channel not found");
    }

    return res.status(500).json({
        channel,
        msg:"list of all the channels"
    })


}
