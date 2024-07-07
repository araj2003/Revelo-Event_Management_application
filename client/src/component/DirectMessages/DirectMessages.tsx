import Add from "@mui/icons-material/Add";
import { getSingleChats } from "@/api";
import { useEffect, useState } from "react";
import { searchUsers } from "@/api";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { useModal } from "@/hooks/user-modal";
import MessageIcon from "@mui/icons-material/Message";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks";

const DirectMessages = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { userId } = useAppSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const [input, setInput] = useState("");
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const { onOpen } = useModal();

  useEffect(() => {
    const getChat = async () => {
      const response: any = await getSingleChats();
      console.log(response);
      setUsers(response?.nonGroupChats);
    };
    getChat();
  }, [roomId]);

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

  return (
    <div className="sidebar ">
      <div className="flex flex-col border-b border-[#49274b] p-[13px] pb-[10px]">
        {data?.length > 0 && (
          <>
            <div className="header__searchResults bg-white p-4 rounded shadow-lg z-10">
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
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex-1">
          <h2>Direct Messages</h2>
          <div className="mt-2">
            {users?.map((member: any) => {
              const otherUser = member.users.filter((user: any) => {
                return user._id !== userId;
              });
              if (otherUser.length > 0) {
                return (
                  <Link to={`/dms/${otherUser[0]._id}`} className="flex items-center justify-between px-2 py-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center">
                        <span className="text-zinc-500">
                          {otherUser[0].name[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-md font-semibold text-sm">
                          {
                            otherUser[0].name
                          }
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        </div>
        {/* <Add className="cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default DirectMessages;
