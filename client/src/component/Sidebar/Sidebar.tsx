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

const Sidebar = () => {
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
      <SidebarOption Icon={Add}  title="Add Channel" />
      <hr />
      {/*  connect to db and list all the channels */}
    </div>
  );
};

export default Sidebar;
