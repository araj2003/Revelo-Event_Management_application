import { Request, Response } from "express";
import Notification from "../models/Notification";
import { BadRequestError } from "../errors";


const getNotifications = async (req: Request, res: Response) => {   
    const userId = req.user.userId;
    const notifications = await Notification.find({ userId, seen: false}).sort({ createdAt: -1 });
    
    return res.status(200).json({ notifications });
}

const markNotificationAsRead = async (req: Request, res: Response) => { 
    const userId = req.user.userId;
    const notificationId = req.params.id;

    const notification = await Notification.findByIdAndUpdate(notificationId,{
        seen: true,
    });
    if(!notification){
        throw new BadRequestError("notification not found");
    }
    return res.status(200).json({ 
        notification,
        msg: "notification marked as read",
    });
}

export { 
    getNotifications,
    markNotificationAsRead
};