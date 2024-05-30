import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "../components/ui/form";
// import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useModal } from "@/hooks/user-modal";
import { EventContext } from "@/context/EventContext";
import { useContext, useState } from "react";
import { addRSVP, createSubEvent } from "@/api";
import { Button } from "../components/ui/button";
// import { EventContext } from "@/context/EventContext";

// const {eventId} = useContext(EventContext)

const ShowRSVPModal = () => {
  const { isOpen, onClose, type, subEventId, subEvent } = useModal();
  const [image, setImage] = useState<File | null>(null);
  // const { eventId, fetchAllSubEvents } = useContext(EventContext);

  const isModalOpen = isOpen && type === "showRSVP";

  const handleClose = () => {
    onClose();
  };

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
        <div>
          <Button className="bg-green-600" variant={null} onClick={handleClose}>Accept</Button>
          <Button className="bg-red-500" variant={null} onClick={handleClose}>Deny</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowRSVPModal;
