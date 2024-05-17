//create a event
import { Request, Response } from "express";
import User from "../models/User"


const createEvent = (req: Request, res: Response) => {
    const userId = req.user.userId
}