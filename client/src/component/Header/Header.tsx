import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState,useEffect } from "react";
import "./Header.css";
import { searchUsers } from "@/api";

const Header = () => {
  const [input,setInput] = useState("")
  const [data, setData] = useState<{}[]>([])
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      searchUsers(input)
        .then((response : any) => {
          console.log(response)
          setData(response)
        })
        .catch((error:any) => console.error(error.response))
    }

    if (input.length >= 3) {
      if (timeoutId) clearTimeout(timeoutId)
      const id = setTimeout(fetchData, 500)
      setTimeoutId(id)
    }
  }, [input])


  const handleInputChange = (e) => {
    setInput(e.target.value.toLowerCase())
  }

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
        <input 
          placeholder="Search for a user " 
          value={input} 
          onChange={handleInputChange}
          autoFocus
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
