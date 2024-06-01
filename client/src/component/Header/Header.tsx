import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Drawer from '@mui/material/Drawer';
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.css";
import { searchUsers } from "@/api";
import { useModal } from "@/hooks/user-modal";
import MessageIcon from "@mui/icons-material/Message";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useAppSelector } from "@/hooks";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


const Header = () => {
  const { profilePicture } = useAppSelector((state) => state.user);
  const [input, setInput] = useState("");
  const [data, setData] = useState<any>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const { onOpen } = useModal();
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
  const openMeetingModal = (userId: string) => {
    onOpen("meetingModal", null, null, userId);
  };


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={()=>setOpenMenu(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  
  return (
    <div className="header ">
      <div className="header__left">
        <div className=" sm:hidden">

        {openMenu ? (
          <CloseIcon className="cursor-pointer" onClick={()=>setOpenMenu((prev)=>!prev)}/>
        ) : (
          <MenuIcon className="cursor-pointer" onClick={()=>setOpenMenu((prev)=>!prev)} />
        )}

      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      {/* <Drawer open={openMenu} onClose={()=>setOpenMenu(false)}>
        {DrawerList}
      </Drawer> */}
      </div>
      </div>
      <div className="header__middle">
        <div className="header__search max-sm:max-w-36 max-sm:pl-0">
          <Input
            placeholder="Search"
            value={input}
            onChange={handleInputChange}
            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
          />
          <SearchIcon className="mt-2 ml-4 cursor-pointer" />
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
                    <MessageIcon />
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

      {/* <div className="header__left ">
        <DashboardIcon />
      </div> */}

      <div className="relative mr-3">
        <button
          id="dropdownDelayButton"
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          <Avatar src={profilePicture} alt="User Avatar" />
          {/* Dropdown hover{" "} */}
          {/* <svg
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
          </svg> */}
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
