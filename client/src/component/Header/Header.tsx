import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useContext } from "react";
import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.css";
import { searchUsers, sendPersonalInvite } from "@/api";
import { useModal } from "@/hooks/user-modal";
import MessageIcon from "@mui/icons-material/Message";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { logout } from "@/store/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EventContext } from "@/context/EventContext";
import Notifaction from "../Notifaction";

const Header = () => {
  const { profilePicture } = useAppSelector((state) => state.user);
  const { eventId } = useContext(EventContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const [data, setData] = useState<any>([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
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

  const handleLogout = () => {
    dispatch(logout());
  };

  const openEvents = () => {
    navigate("/myEvents");
  };

  const openProfile = () => {
    navigate("/myProfile");
  };

  const personalInviteToEvent = async (userId: string) => {
    if (!eventId) {
      toast.error("Please select an event to invite");
      return;
    }
    const inviteData = {
      eventId,
      userId,
    };
    const response: any = await sendPersonalInvite(inviteData);
    if (!response.error) {
      toast.success(response.msg);
      
    }
  };
  return (
    <div className="header ">
      <div className="header__left">
        <div className=" sm:hidden">
          {openMenu ? (
            <CloseIcon
              className="cursor-pointer"
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          ) : (
            <MenuIcon
              className="cursor-pointer"
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          )}

          {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
          {/* <Drawer open={openMenu} onClose={()=>setOpenMenu(false)}>
        {DrawerList}
      </Drawer> */}
        </div>
      </div>
      <div className="header__middle">
        <div className=" w-96 header__search max-sm:max-w-36 max-sm:pl-0">
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
            <div className="header__searchResults bg-white p-4 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-4">
                {data.length} users found
              </h2>
              {data.map((user: any) => (
                <div
                  key={user._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center bg-purple-50 hover:bg-purple-600 hover:text-white cursor-pointer border-gray-600 border-[0.5px] p-2 rounded mb-2 transition-colors duration-200"
                >
                  <div className="mr-4 mb-2 sm:mb-0">{user.name}</div>
                  <Link className="mr-2 mb-2 sm:mb-0" to={`/dms/${user._id}`}>
                    <MessageIcon />
                  </Link>
                  <button
                    onClick={() => openMeetingModal(user._id)}
                    className="mr-2 mb-2 sm:mb-0"
                  >
                    <EditCalendarIcon />
                  </button>
                  {user?.role == "vendor" && (
                    <div className="flex gap-2">
                      <div className="text-xs text-gray-100 bg-purple-500 rounded p-2 ">
                        vendor
                      </div>
                      <div className="text-xs text-gray-100 bg-purple-500 rounded p-2 ">
                        {user?.subroll}
                      </div>
                    </div>
                  )}
                  <button
                    className="bg-purple-500 text-white ml-1 px-2 rounded"
                    onClick={() => personalInviteToEvent(user._id)}
                  >
                    Invite
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center">
        <div className="">
          <Notifaction/>
        </div>

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
            className={`z-10 ${showDropdown ? "absolute" : "hidden"} right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDelayButton"
            >
              <li>
                <a
                  onClick={openEvents}
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
                  onClick={openProfile}
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
