import Add from "@mui/icons-material/Add";
import { getSingleChat } from "@/api";
import { useEffect, useState } from "react";
import { searchUsers } from "@/api";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { useModal } from "@/hooks/user-modal";
import MessageIcon from "@mui/icons-material/Message";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

const DirectMessages = () => {
  const [data, setData] = useState([]);
  const [user, setUsers] = useState([]);

  const [input, setInput] = useState("");
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const { onOpen } = useModal();

  useEffect(() => {
    const getChat = async () => {
      const response: any = await getSingleChat();
      console.log(response);
      setData(response?.users);
    };
    getChat();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      searchUsers(input)
        .then((response: any) => {
          console.log(response);
          setUsers(response.users);
        })
        .catch((error: any) => console.error(error.response));
    };

    if (input.length >= 3) {
      if (timeoutId) clearTimeout(timeoutId);
      const id = setTimeout(fetchData, 500);
      setTimeoutId(id);
    } else {
      setUsers([]);
    }
  }, [input]);

  const handleInputChange = (e: any) => {
    setInput(e.target.value.toLowerCase());
  };
  const openMeetingModal = (userId: string) => {
    onOpen("meetingModal", null, null, userId);
  };
  const server = {
    members: [
      {
        name: "John Doe",
      },
      {
        name: "Jane Doe",
      },
      {
        name: "John Smith",
      },
    ],
  };
  return (
    <div className="sidebar ">
      <div className="flex flex-col border-b border-[#49274b] p-[13px] pb-[10px]">
        <div className=" w-96 header__search max-sm:max-w-36 max-sm:pl-0">
          <Input
            placeholder="Search"
            value={input}
            onChange={handleInputChange}
            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
          />
          <SearchIcon className="mt-2 ml-4 cursor-pointer" />
        </div>

        {data?.length > 0 && (
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
                  <button className="mr-2 mb-2 sm:mb-0">
                    <MessageIcon />
                  </button>
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
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex-1">
          <h2>Direct Messages</h2>
          <div className="mt-2">
            {server.members.map((member) => (
              <div className="flex items-center justify-between px-2 py-3">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center">
                    <span className="text-zinc-500">{member.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-md font-semibold text-sm">
                      {member.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2">
            {data?.map((member: any) => (
              <div className="flex items-center justify-between px-2 py-3">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center">
                    <span className="text-zinc-500">{member.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-md font-semibold text-sm">
                      {member.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Add className="cursor-pointer" />
      </div>
    </div>
  );
};

export default DirectMessages;
