import express from "express";

const router = express.Router();

import {
  addAdmin,
  getSubEvent,
  createSubEvent,
  removeAdmin,
  deleteSubEvent,
} from "../controllers/subEvent";

//middleware (only host can do it)

//create subevent ..
router.post("/createSubEvent", createSubEvent);

//get subevent ..
router.get("/getSubEvent", getSubEvent);

//create host ..
router.put("/addAdmin", addAdmin);

//remove from host ..
router.put("removeAdmin", removeAdmin);

//cancel subevent
router.delete("deleteSubEvent", deleteSubEvent);

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
