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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { addMember, getMembersNotInSubEvent, removeMember } from "@/api";

const formSchema = z.object({});

type FormValues = z.infer<typeof formSchema>;

const MembersModal = () => {
  const { isOpen, onClose, type, subEventId } = useModal();

  const { eventId } = useContext(EventContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const isModalOpen = isOpen && type === "members";

  const [membersNotInSubEvent, setMembersNotInSubevent] = useState<any>([]);
  const [membersInSubEvent, setMembersInSubevent] = useState<any>([]);
  useEffect(() => {
    const getUsers = async () => {
      const response: any = await getMembersNotInSubEvent(eventId, subEventId);
      console.log(response?.usersNotInSubEvent);
      if (response?.usersNotInSubEvent) {
        setMembersNotInSubevent(response?.usersNotInSubEvent);
        setMembersInSubevent(response?.usersInSubEvent);
      }
    };
    if (isModalOpen && subEventId) getUsers();

  }, [isModalOpen]);
  console.log(membersNotInSubEvent, membersInSubEvent);
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

  const handleAddMember = async (userId: any) => {
    console.log(userId);
    const response: any = await addMember(eventId,subEventId, userId);
    console.log(response);
    if (response.msg) {
      // remove user from not in subevent and add to in subevent
      const user = membersNotInSubEvent.find(
        (user: any) => user._id === userId,
      );
      setMembersNotInSubevent((prev: any) =>
        prev.filter((user: any) => user._id !== userId),
      );
      setMembersInSubevent((prev: any) => [...prev, user]);
    }
  };

  const handleRemoveMember = async (userId: any) => {
    console.log(userId);
    const response: any = await removeMember(eventId,subEventId, userId);
    console.log(response);
    // console.log(response.);
    if (response.msg) {
      // remove user from not in subevent and add to in subevent
      const user = membersInSubEvent.find((user: any) => user._id === userId);
      setMembersInSubevent((prev: any) =>
        prev.filter((user: any) => user._id !== userId),
      );
      setMembersNotInSubevent((prev: any) => [...prev, user]);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl  text-center font-bold">
            Manage Members
          </DialogTitle>
          {/* <DialogDescription className="text-center text-zinc-500">
            Static Data with 4 members
          </DialogDescription> */}
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold px-6 py-4">Current Members</h2>
            {membersInSubEvent.length > 0 ? (
              membersInSubEvent?.map((member: any) => (
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                      <span className="text-zinc-500">{member?.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-md font-bold">{member?.name}</p>
                      <p className="text-zinc-500 text-sm">{member?.email}</p>
                      {member?.role == 'vendor' &&  <p className="text-zinc-500 text-sm">Vendor</p> }

                    </div>
                  </div>
                  {membersInSubEvent.length > 1 && <Button
                    variant={null}
                    onClick={() => handleRemoveMember(member?._id)}
                  >
                    <PersonRemoveIcon className="ml-2" />
                  </Button>}
                </div>
              ))
            ) : (
              <div className="flex items-center ml-8">
                <p className="text-zinc-500">No members have been added</p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold px-6 py-4">
              Add Members in SubEvent
            </h2>
            {membersNotInSubEvent.length > 0 ? (
              membersNotInSubEvent?.map((member: any) => (
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                      <span className="text-zinc-500">{member?.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-md font-bold">{member?.name}</p>
                      <p className="text-zinc-500 text-sm">{member?.email}</p>
                      {member?.role == 'vendor' &&  <p className="text-zinc-500 text-sm">Vendor</p> }
                    </div>
                  </div>
                  <Button
                    variant={null}
                    onClick={() => handleAddMember(member?._id)}
                  >
                    <PersonAddIcon className="ml-2" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex items-center ml-8">
                <p className="text-zinc-500">
                  No members to add - Invite more members to this event
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
