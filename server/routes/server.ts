import express from "express";
import authMiddleWare from "../middleware/authentication";
import upload from "../middleware/multer";

const router = express.Router();

import {
    deleteEvent,
    removeHost,
    createEvent,
    getEvent,
    createHost
} from "../controllers/event";



    
    //middleware (only host can do it)


    //create event ..
    router.post("/createEvent", createEvent);
    
    //get event ..
    router.get("/getEvent",  getEvent);
    
    //create host ..
    router.put("/createHost",createHost);
    
    //remove from host ..
    router.put('removeHost',removeHost)
    
    //cancel event
    router.delete('deleteEvent',deleteEvent)

export default router;


/*

event:-
    


    add members (via link/email) last
    get all member 
    give role(only to vendors) -last
    
    
    add subevent
subevent:-
    get Subevent
    add members (via link)
    add channel
    get member list
    rsvp
    name change 
    

channel:-
    get channel
    create channel
    

chats:- 
    create groups
    message in group(group id)

direct message:-
    search people(person name)
    message people(person id)






//add channel 

//add person via id 


*/


