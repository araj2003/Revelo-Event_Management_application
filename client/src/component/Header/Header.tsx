import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import "./Header.css";

const Header = () => {
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    setSearch("");
  };
  return (
    <div className="header ">
      <div className="header__left ">
        <Avatar alt="User Avatar" />
        {/* <AccessTimeIcon /> */}
        {/* header left */}
      </div>
      <div className="header__search ">
        <Input
          placeholder="Search for a User"
          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon
          className="mt-2 ml-4 cursor-pointer"
          onClick={handleSearch}
        />
      </div>

      <div className="header__left ">
        <HelpOutlineIcon />
        {/* header right */}
      </div>
    </div>
  );
};

export default Header;
