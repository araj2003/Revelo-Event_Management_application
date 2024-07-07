import React, { useEffect, useState } from "react";
import { getNotifications, readNotification } from "@/api";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Notifaction = () => {
  const navigate = useNavigate()
  const [showNotification, setShowNotification] = useState(false);
  const [data, setdata] = useState([]);
  const getAllNotifications = async () => {
    const response: any = await getNotifications();
    setdata(response.notifications);
  };
  useEffect(() => {
    getAllNotifications();
  }, []);
  console.log(data);
  const handleClick = (id:string,url:string) => {
    const response = readNotification(id);
    console.log(response);
    navigate(url)
  };
  return (
    <>
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
          {data.map((item: any) => {
            return (
              // <div>{item?.message}</div>
              <button onClick={() => handleClick(item?._id,item?.url)}>
              <Link
                to={`${item?.url}`}
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
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item?.message}
                    </span>
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-500">
                    {
                    new Date(item?.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }) +
                      " at " +
                      new Date(item?.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })                }
                    
                    
                  </div>
                </div>
              </Link>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notifaction;
