import "./Sidebar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import SidebarOption from "../SidebarOption/SidebarOption";
import InsertComment from "@mui/icons-material/InsertComment";
import Inbox from "@mui/icons-material/Inbox";
import Drafts from "@mui/icons-material/Drafts";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import Apps from "@mui/icons-material/Apps";
import FileCopy from "@mui/icons-material/FileCopy";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { ExpandMore } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import { useContext, useEffect, useState } from "react";
import { getSubEvents } from "../../api";
import { EventContext } from "@/context/EventContext";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/user-modal";

const Sidebar = () => {
  const { eventId, subEvents, setSubEvents, setEvent, event } =
    useContext(EventContext);
  const { onOpen } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [channels, setChannels] = useState([
    {
      id: 1,
      channel: "Youtube 1",
    },
    // {
    //   id: 2,
    //   channel: "Discord ",
    // },
    // {
    //   id: 3,
    //   channel: "Miro ",
    // },
    // {
    //   id: 4,
    //   channel: "figma ",
    // },
  ]);

  const openInviteMemberModal = () => {
    onOpen("inviteMember");
  };

  useEffect(() => {
    // eventId = "664b2b8a05eea2de292c2bd8";
    console.log(event);
    const fetchAllSubEvents = async () => {
      try {
        const data: any = await getSubEvents(eventId);
        console.log(data);
        if (data.event) {
          setEvent(data.event);
          setSubEvents(data.subEvents);
          console.log(data.subEvents);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllSubEvents();
  }, [eventId]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Sahil The Developer</h2>
          <h3>
            <FiberManualRecordIcon />
            Mohd Sahil
          </h3>
        </div>
        <CreateIcon />
      </div>
      {/* <SidebarOption Icon={InsertComment} title="Threads" />
      <hr />
      <SidebarOption Icon={Inbox} title="Mentions & Reactions" />
      <hr />
      <SidebarOption Icon={Drafts} title="Saved items" />
      <hr />
      <SidebarOption Icon={PeopleAlt} title="People & user groups" />
      <hr />
      <SidebarOption Icon={Apps} title="Apps" />
      <hr />
      <SidebarOption Icon={FileCopy} title="File browser" />
      <hr />
      <SidebarOption Icon={ExpandLess} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMore} title="Channels" />
      <hr /> */}
      {subEvents.map((subEvent: any) => (
        <>
          {/* <div onClick={() => console.log("clicked")}> */}
          <SidebarOption
            key={subEvent._id}
            title={subEvent.subEventName}
            showIcon={true}
            Icon={isOpen ? ExpandLess : ExpandMore}
            id={subEvent._id}
            onClick={() => setIsOpen(!isOpen)}
            type = "subevent"
          />
          <hr />
          {/* </div> */}
        </>
      ))}
      <SidebarOption Icon={Add} title="Add Subevent" addChanneloption={true} />
      <hr />
      {/*  connect to db and list all the channels */}
      {channels.map((channel) => (
        <SidebarOption
          key={channel.id}
          title={channel.channel}
          showIcon={false}
          id={channel.id}
        />
      ))}
      <Button size="default" className="mt-4" onClick={openInviteMemberModal}>
        Invite Member
      </Button>
    </div>
  );
};

export default Sidebar;
