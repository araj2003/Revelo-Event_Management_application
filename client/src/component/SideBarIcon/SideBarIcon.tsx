import { BsPlus, BsFillLightningFill } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { IoHome } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { useModal } from "@/hooks/user-modal";
import React, { useContext, useEffect, useState } from "react";
import { getAllEvent } from "../../api";
import { EventContext } from "@/context/EventContext";
import "./SideBarIcon.css";

const SideBarIcon = ({setIsDm,isDm}:{
  setIsDm:React.Dispatch<React.SetStateAction<boolean>>,
  isDm:boolean
}) => {
  const [events, setEvents] = useState([]);
  const { setEventId } = useContext(EventContext);
  const { onOpen } = useModal();

  const addServer = () => {
    onOpen("createEvent");
  };

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const data: any = await getAllEvent();
        console.log(data);
        if (data.events) {
          // console.log("abcd");
          setEvents(data.events);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllEvents();
  }, []);

  // const {eventId,setEventId,events,setEvents} = useContext(EventContext)

  // const [selectedEvent, setSelectedEvent] = useState("");

  return (
    <div className="  flex  flex-col w-20 bg-slack space-y-3 ">
      {/* <Divider /> */}
      <div className="sidebar__icon">
        {
          !isDm?<SideBar
          icon={
            <span className="transition-transform duration-300 ease-in hover:scale-125" onClick={() => setIsDm((prev)=>!prev) }>
              <ForwardToInboxIcon />
            </span>
          }
        />:
        <SideBar
          icon={
            <span className="transition-transform duration-300 ease-in hover:scale-125" onClick={() => setIsDm((prev)=>!prev) }>
              <IoHome size="22" />
            </span>
          }
        />
        }
        {}
        {events?.map((event: any) => (
          <SideBar
            key={event._id}
            icon={event.serverName.charAt(0)}
            setEventId={setEventId}
            id={event._id}
            fnc={()=>setIsDm(false)}
          />
        ))}
        <SideBar
          icon={
            <span className="transition-transform duration-300 ease-in hover:scale-125">
              <IoIosMore size="22" />
            </span>
          }
        />
      </div>
      <div className="bottom-0 ">
        <SideBar
          icon={
            <span
              className="transition-transform duration-300 ease-in hover:scale-125"
              onClick={addServer}
            >
              <BsPlus size="32" />
            </span>
          }
        />
      </div>
    </div>
  );
};
const SideBar = ({
  icon,
  id,
  setEventId,
  fnc,
}: {
  icon: any;
  id?: string;
  setEventId?: any;
  fnc?: any;
}) => {
  // console.log(id)
  return (
    <div
      className="sidebar-icon"
      onClick={() => {
        if (setEventId) {
          setEventId(id);

        }
        if(fnc){
          fnc()
        }
      }}
    >
      {icon}
    </div>
  );
};

const Divider = () => <hr className="sidebar-hr" />;

export default SideBarIcon;
