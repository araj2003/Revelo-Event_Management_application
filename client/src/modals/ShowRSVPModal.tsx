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
import { acceptRejectRsvp, hasAccepted } from "@/api";
import { Button } from "../components/ui/button";
// import { EventContext } from "@/context/EventContext";

// const {eventId} = useContext(EventContext)

const ShowRSVPModal = () => {
  const { isOpen, onClose, type, subEventId, subEvent } = useModal();
  const [accepted, setAccepted] = useState(null);
  // const { eventId, fetchAllSubEvents } = useContext(EventContext);

  const isModalOpen = isOpen && type === "showRSVP";
  console.log(type);

  const handleReq = async (e: any) => {
    const response = await acceptRejectRsvp(subEventId, e.target.value);
    console.log(response);
    setAccepted(e.target.value);
  };

  const handleClose = async (e: any) => {
    onClose();
  };

  useEffect(() => {
    if (subEvent?.rsvp) {
      const hasAcceptedRSVP = async () => {
        const response: any = await hasAccepted(subEventId);
        console.log(response);
        setAccepted(response.status);
      };
      hasAcceptedRSVP();
    }
  }, [subEvent,isModalOpen]);
  console.log(accepted)

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
        <div className="ml-4 mb-4 gap-4">
          {!accepted || accepted === "pending" ? (
            <>
              <Button
                className={`bg-green-600`}
                variant={null}
                onClick={handleReq}
                value={"accept"}
              >
                Accept
              </Button>
              <Button
                className="bg-red-500"
                variant={null}
                onClick={handleReq}
                value={"reject"}
              >
                Deny
              </Button>
            </>
          ) : accepted === "accept" ? (
            <Button className="bg-green-600" variant={null}>
              Accepted
            </Button>
          ) : accepted === "reject" ? (
            <Button className="bg-red-500" variant={null}>
              Rejected
            </Button>
          ) : <h2>Loading...</h2>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowRSVPModal;
