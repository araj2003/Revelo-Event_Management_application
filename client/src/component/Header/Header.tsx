import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import "./Header.css";

const Header = () => {
  return (
    <div className="header ">
      <div className="header__left ">
        <Avatar alt="User Avatar" />
        <AccessTimeIcon />
        {/* header left */}
      </div>
      <div className="header__search  ">
        {/* search icon */}
        <SearchIcon />
        {/* input */}
        <input placeholder="Search for a user " />
      </div>

      <div className="header__left ">
        <HelpOutlineIcon />
        {/* header right */}
      </div>
    </div>
  );
};

export default Header;
