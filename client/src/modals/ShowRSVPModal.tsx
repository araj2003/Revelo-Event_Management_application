import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
// import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useModal } from "@/hooks/user-modal";
import { useContext, useEffect, useState } from "react";
import { acceptRejectRsvp, getRSVPList, hasAccepted } from "@/api";
import { Button } from "../components/ui/button";
import { EventContext } from "@/context/EventContext";

const ShowRSVPModal = () => {
  const { isOpen, onClose, type, subEventId, subEvent } = useModal();
  const [accepted, setAccepted] = useState(null);
  const { role } = useContext(EventContext);
  const [listType, setListType] = useState("accepted"); // ["pending", "accepted", "rejected"]
  const [rsvpList, setRsvpList] = useState<any[]>([]);
  const [currentList, setCurrentList] = useState<any[]>([]);

  const isModalOpen = isOpen && type === "showRSVP";

  const handleReq = async (e: any) => {
    const response = await acceptRejectRsvp(subEventId, e.target.value);
    // console.log(response);
    setAccepted(e.target.value);
  };

  const handleClose = async (e: any) => {
    onClose();
  };

  useEffect(() => {
    if (subEvent?.rsvp) {
      if (role === "host") {
        const getList = async () => {
          const response: any = await getRSVPList(subEventId);
          // console.log(response);
          if (response.users) {
            setRsvpList(response.users);
          }
        };
        getList();
      } else {
        const hasAcceptedRSVP = async () => {
          const response: any = await hasAccepted(subEventId);
          setAccepted(response.status);
        };
        hasAcceptedRSVP();
      }
    }
  }, [subEvent, isModalOpen]);

  useEffect(() => {
    console.log(rsvpList);
    const list = rsvpList.filter((user) => {
      switch (listType) {
        case "accepted":
          return subEvent?.rsvp?.userIds?.accepted.includes(user._id);
        case "rejected":
          return subEvent?.rsvp?.userIds?.rejected.includes(user._id);
        default:
          return (
            !subEvent?.rsvp?.userIds?.accepted.includes(user._id) &&
            !subEvent?.rsvp?.userIds?.rejected.includes(user._id)
          );
      }
    });
    console.log(list);
    setCurrentList(list);
  }, [listType, rsvpList]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl  text-center font-bold">
            RSVP
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            RSVP to the subevent
          </DialogDescription>
        </DialogHeader>
        <div>
          <h2 className="text-lg font-bold text-center">
            {subEvent?.rsvp?.title}
          </h2>
          <h4 className="text-center">{subEvent?.rsvp?.description}</h4>
        </div>
        <img
          src={subEvent?.rsvp?.image}
          alt="rsvp"
          className="w-[30rem] object-cover mx-auto rounded-lg"
        />
        {role === "host" ? (
          <div>
            <div className="ml-4 mb-4 flex gap-1">
              <Button
                className={` ${
                  listType === "accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-green-700 text-green-100"
                }`}
                variant={null}
                onClick={() => setListType("accepted")}
              >
                Accepted
              </Button>
              <Button
                // className="bg-red-600 text-red-100"
                className={` ${
                  listType === "rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-red-600 text-red-100"
                }`}
                variant={null}
                onClick={() => setListType("rejected")}
              >
                Rejected
              </Button>
              <Button
                // className="bg-blue-600 text-blue-100"
                className={` ${
                  listType === "pending"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-blue-600 text-blue-100"
                }`}
                variant={null}
                onClick={() => setListType("pending")}
              >
                Pending
              </Button>
            </div>
            <div className="">
              {currentList.map((user: any) => (
                <div className="flex items-center p-2 gap-4 bg-slate-200 rounded-lg m-2">
                  <img
                    src={user.profilePicture}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                  <p>{user.name}</p>
                </div>
              ))}
              {currentList.length === 0 && (
                <div className="flex items-center p-2 gap-4 bg-slate-200 rounded-lg m-2">
                  <p>No users found - Invite more people to this sub-event</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="ml-4 mb-4 gap-4">
            {!accepted || accepted === "pending" ? (
              <>
                <Button
                  className={`bg-green-700 text-green-100`}
                  variant={null}
                  onClick={handleReq}
                  value={"accept"}
                >
                  Accept
                </Button>
                <Button
                  className="bg-red-600 text-red-100"
                  variant={null}
                  onClick={handleReq}
                  value={"reject"}
                >
                  Deny
                </Button>
              </>
            ) : accepted === "accept" ? (
              <Button className="bg-green-700 text-green-100" variant={null}>
                Accepted
              </Button>
            ) : accepted === "reject" ? (
              <Button className="bg-red-600 text-red-100" variant={null}>
                Rejected
              </Button>
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShowRSVPModal;
