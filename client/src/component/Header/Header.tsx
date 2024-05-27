import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Input } from "@/components/ui/input"

import "./Header.css";

const Header = () => { 
  return (
    <div className="header ">
      <div className="header__left ">
        <Avatar alt="User Avatar" />
        {/* <AccessTimeIcon /> */}
        {/* header left */}
      </div>
      <div className="header__search ">
 
        <Input placeholder="Search for User" className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" />
        <SearchIcon className="mt-2 ml-4 cursor-pointer" />
      </div>

      <div className="header__left ">
        <HelpOutlineIcon />
        {/* header right */}
      </div>
    </div>
  );
};

export default Header;
