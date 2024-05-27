import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormLabel,
//   FormMessage,
//   FormItem,
// } from "../components/ui/form";
import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useModal } from "@/hooks/user-modal";
import { EventContext } from "@/context/EventContext";
import { useContext, useEffect, useState } from "react";
// import { createInvite } from "@/api";
// import { toast } from "react-toastify";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { getMembersNotInSubEvent } from "@/api";

const formSchema = z.object({});

type FormValues = z.infer<typeof formSchema>;

const MembersModal = () => {
  const { isOpen, onClose, type } = useModal();

  const { subEventId, eventId } = useContext(EventContext);
  console.log(subEventId);
  console.log(eventId);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getMembersNotInSubEvent(eventId, subEventId);
      console.log(response);
    };
    getUsers();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const isModalOpen = isOpen && type === "members";

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const server = {
    members: [
      {
        name: "John Doe",
        email: "email@gmaill.com",
      },
      {
        name: "Jane Doe",
        email: "font@gmail.conm",
      },
      {
        name: "John Smith",
        email: "asdsa@gmail.com",
      },
      {
        name: "Jane Smith",
        email: "abcd.efg",
      },
      {
        name: "Jane Smith",
        email: "abcd.efg",
      },
      {
        name: "Jane Smith",
        email: "abcd.efg",
      },
    ],
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl  text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Static Data with 4 members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server.members.map((member) => (
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                  <span className="text-zinc-500">{member.name[0]}</span>
                </div>
                <div>
                  <p className="text-md font-bold">{member.name}</p>
                  <p className="text-zinc-500 text-sm">{member.email}</p>
                </div>
              </div>
              <Button variant={null} className="text-red-500">
                <PersonRemoveIcon className="ml-2" />
              </Button>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
