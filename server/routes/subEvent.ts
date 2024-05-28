import express from "express";
import authMiddleWare from "../middleware/authentication";

const router = express.Router();

import {
  addAdmin,
  getSubEvent,
  createSubEvent,
  removeAdmin,
  deleteSubEvent,
  getAllChannels,
  updateSubEvent,
  addUserToSubEvent,
  removeUsersFromSubEvent,
  getUsersNotInSubEvent,
} from "../controllers/subEvent";

//middleware (only host can do it)

//create subevent ..
router.post("/createSubEvent", authMiddleWare, createSubEvent);

//get subevent ..
router.get("/getSubEvent", authMiddleWare, getSubEvent);

//create host ..
router.put("/addAdmin", authMiddleWare, addAdmin);

//remove from host ..
router.put("removeAdmin", authMiddleWare, removeAdmin);

//cancel subevent
router.delete("deleteSubEvent", authMiddleWare, deleteSubEvent);

//get all channels
router.get("/:subEventId/getAllChannels", authMiddleWare, getAllChannels);

router.get("/updateSubEvent", authMiddleWare, updateSubEvent);

router.patch("/addUser/:subEventId", authMiddleWare, addUserToSubEvent);

router.delete(
  "/removeUsers/:subEventId",
  authMiddleWare,
  removeUsersFromSubEvent,
);

router.get(
  "/getMembersNotInSubEvent/:eventId/:subEventId",
  authMiddleWare,
  getUsersNotInSubEvent,
);

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
