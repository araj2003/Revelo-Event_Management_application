import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.css";
import { searchUsers } from "@/api";
import { useModal } from "@/hooks/user-modal";
import MessageIcon from "@mui/icons-material/Message";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { logout } from "@/store/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { profilePicture } = useAppSelector((state) => state.user);
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
                  {user?.role == "vendor" && (
                    <div>vendor category: {user?.subroll}</div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center">
        <div className="">
          <button
            onClick={() => setShowNotification(!showNotification)}
            id="dropdownNotificationButton"
            data-dropdown-toggle="dropdownNotification"
            className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 14 20"
            >
              <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
            </svg>
            <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
          </button>
          <div
            id="dropdownNotification"
            className={`z-20 ${showNotification ? "absolute" : "hidden"} right-0 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700`}
            aria-labelledby="dropdownNotificationButton"
          >
            <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
              Notifications
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <a
                href="#"
                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex-shrink-0">
                  {/* <img
                  className="rounded-full w-11 h-11"
                  src="/docs/images/people/profile-picture-1.jpg"
                  alt="Jese image"
                /> */}
                  <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                    <svg
                      className="w-2 h-2 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                      <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                    </svg>
                  </div>
                </div>
                <div className="w-full ps-3">
                  <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                    New message from{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Jese Leos
                    </span>
                    : "Hey, what's up? All set for the presentation?"
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-500">
                    a few moments ago
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex-shrink-0">
                  {/* <img
                  className="rounded-full w-11 h-11"
                  src="/docs/images/people/profile-picture-1.jpg"
                  alt="Jese image"
                /> */}
                  <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                    <svg
                      className="w-2 h-2 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                      <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                    </svg>
                  </div>
                </div>
                <div className="w-full ps-3">
                  <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                    New message from{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Jese Leos
                    </span>
                    : "Hey, what's up? All set for the presentation?"
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-500">
                    a few moments ago
                  </div>
                </div>
              </a>
            </div>
          </div>
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
