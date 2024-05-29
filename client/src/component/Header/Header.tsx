import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

import "./Header.css";
import { searchUsers } from "@/api";

const Header = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState<any>([]);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      searchUsers(input)
        .then((response: any) => {
          console.log(response);
          setData(response.users);
        })
        .catch((error: any) => console.error(error.response));
    };

    if (input.length >= 3) {
      if (timeoutId) clearTimeout(timeoutId);
      const id = setTimeout(fetchData, 500);
      setTimeoutId(id);
    }
    else {
      setData([]);
    }
  }, [input]);

  const handleInputChange = (e: any) => {
    setInput(e.target.value.toLowerCase());
  };

  return (
    <div className="header ">
      <div className="header__left ">
        <Avatar alt="User Avatar" />
        {/* <AccessTimeIcon /> */}
        {/* header left */}
      </div>
      <div className="header__middle">
        <div className="header__search">
          <Input
            placeholder="Search for User"
            value={input}
            onChange={handleInputChange}
            className="border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
          />
          <SearchIcon className="mt-2 ml-4 cursor-pointer" />
          {/* <input 
          placeholder="Search for a user " 
          value={input} 
          onChange={handleInputChange}
          autoFocus
        /> */}
        </div>
        {data.length>0 && (
          <>
          <div className="header__searchResults">
          {data.length} users found
            {data.map((user: any) => (
              <div key={user.id} className="bg-gray-50 border-gray-600 border-[0.5px]">{user.name}</div>
            ))}
          </div>
        </>
        )}
      </div>

      <div className="">
        <HelpOutlineIcon />
        {/* header right */}
      </div>
    </div>
  );
};

export default Header;
