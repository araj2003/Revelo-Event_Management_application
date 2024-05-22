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
import { useEffect, useState } from "react";
import { getSubEvents } from "../../api";

const Sidebar = ({eventId}:{eventId:string}) => {
  const [subEvents, setSubEvents] = useState([]);
  const [channels, setChannels] = useState([
    {
      id: 1,
      channel: "Youtube 1",
    },
    {
      id: 2,
      channel: "Discord ",
    },
    {
      id: 3,
      channel: "Miro ",
    },
    {
      id: 4,
      channel: "figma ",
    },
  ]);


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
      <SidebarOption Icon={InsertComment} title="Threads" />
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
      <hr />
      <SidebarOption Icon={Add} title="Add Channel" />
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
    </div>
  );
};

export default Sidebar;
