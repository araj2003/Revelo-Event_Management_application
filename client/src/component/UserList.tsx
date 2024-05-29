import React from "react";
import profImg from "@/../assets/logo-xero@2x.png";

const defaultUsers = [
  {
    name: "Neil Sims",
    email: "email@email@windster.com",
  },
  {
    name: "Bonnie Green",
    email: "email@bonnie.com",
  },
  {
    name: "Michael Gough",
    email: "email@michael.com",
  },
  {
    name: "Lana Byrd",
    email: "email@lana.com",
  },
];

function UserList() {
  return (
    <div className="w-full max-w-md p-4 bg-slack text-slack_text border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none ">
          Event Members
        </h5>
        {/* <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a> */}
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {defaultUsers.map((user) => (
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={profImg}
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium truncate ">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserList;
