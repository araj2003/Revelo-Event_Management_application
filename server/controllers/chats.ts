import { Request, Response, response } from "express";
import User from "../models/User"
import eventSchemma from "../models/Server";
import chatSchema from "../models/Chat";
import subEventSchema from "../models/SubEvent";
import { BadRequestError, UnauthenticatedError } from "../errors";


//single chat
const createSingleChat = async(req: Request, res: Response) => {

    const {senderId} = req.body
    const sender = await User.findById(senderId)

    if(!sender){
        throw new BadRequestError("user not found");
    }

    var isChat = await chatSchema.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user.userId}}},
            {users:{$elemMatch:{$eq:senderId}}}
        ]
    })
    .populate("users","-password")
    .populate("latestMessage")

    
    if(isChat.length > 0){
        res.json(
            isChat[0]
        )
    } 
    else{
        var chatData = {
            isGroupChat:false,
            chatName:"sender",
            users:[req.user.userId,senderId]
        }
        try {
            const createdChat = await chatSchema.create(chatData)
        const fullChat = await chatSchema.findOne({_id:createdChat._id}).populate(
            "users",
            "-password"
        )

        res.status(200).json(
            {fullChat,
            msg:"new chat created"}
        )
            
        } catch (error) {
            res.json({
                msg:"error in creating new chat",
                error:error
            })
        }

        
    }


}

//create group
const createGrupChat = async(req: Request, res: Response) => {
    // const {}
}

