import React,{useState} from "react";

const EventCard = ({event}:any) => {
    const [showMembers,setShowMembers] = useState(false)
  return (
    <div className="event-list  ">
      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
          {event?.serverName}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {event?.description}
        </p>
        <button
          id="dropdownUsersButton"
          data-dropdown-toggle="dropdownUsers"
          data-dropdown-placement="bottom"
          className="text-white bg-slate-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
          onClick={() => setShowMembers(!showMembers)}
        >
          Event Members{" "}
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
          id="dropdownUsers"
          className={`z-10 ${showMembers ? "absolute" : "hidden"} bg-white rounded-lg shadow w-60 dark:bg-gray-600`}
        >
          <ul
            className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUsersButton"
          >
            {event?.users.map((user: any) => {
              return (
                <li>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <img
                      className="w-6 h-6 me-2 rounded-full"
                      src={user?.profilePicture}
                      alt="Jese image"
                    />

                    {user?.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </a>
    </div>
  );
};

export default EventCard;
