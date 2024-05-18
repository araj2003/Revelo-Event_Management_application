import { Request, Response, response } from "express";
import User from "../models/User"
import eventSchemma from "../models/Server";
import { BadRequestError, UnauthenticatedError } from "../errors";


//single chat
const createSingleChat = async(req: Request, res: Response) => {

    const {userId} = req.body
    const user = await User.findById(userId)

    if(!user){
        throw new BadRequestError("user not found");
    }
    

}