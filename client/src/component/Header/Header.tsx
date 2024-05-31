import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "./Header.css";
import { searchUsers } from "@/api";
import { useModal } from "@/hooks/user-modal";
import MessageIcon from '@mui/icons-material/Message';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';


const Header = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState<any>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const {onOpen} = useModal() 
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
    } else {
      setData([]);
    }
  }, [input]);

  const handleInputChange = (e: any) => {
    setInput(e.target.value.toLowerCase());
  };
  const openMeetingModal = (userId:string) => {
    onOpen("meetingModal",null,null,userId)
  }
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
            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
          />
          <SearchIcon className="mt-2 ml-4 cursor-pointer" />
          {/* <input 
          placeholder="Search for a user " 
          value={input} 
          onChange={handleInputChange}
          autoFocus
        /> */}
        </div>
        {data.length > 0 && (
          <>
            <div className="header__searchResults">
              {data.length} users found
              {data.map((user: any) => (
                <div className="flex">
                <div
                  key={user._id}
                  className="bg-gray-50 border-gray-600 border-[0.5px]"
                >
                  {user.name}
                </div>
                <button>
                <MessageIcon/>
                </button>
                
                <button onClick={() => openMeetingModal(user._id)}>
                <EditCalendarIcon />
                </button>
                
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="header__left ">
        <DashboardIcon />
        {/* header right */}
      </div>

      <div className="relative mr-3">
        <button
          id="dropdownDelayButton"
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-white hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-purple-600 dark:hover:bg-purple-800 dark:focus:ring-purple-800"
          type="button"
        >
          Dropdown hover{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdownDelay"
          className={`z-10 ${showDropdown ? "absolute" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDelayButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My Events
              </a>
            </li>
            {/* <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Floorplan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Calendar
              </a>
            </li> */}
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
