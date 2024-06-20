import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useModal } from "@/hooks/user-modal";
import { EventContext } from "@/context/EventContext";
import { useContext, useEffect, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { getEventMembers ,createHost, removeHost} from "@/api";

const formSchema = z.object({});

const EventMemberModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { eventId } = useContext(EventContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const isModalOpen = isOpen && type === "eventMemberModal";
  const [users, setUsers] = useState<any>([]);
  const getUsers = async () => {
    const response: any = await getEventMembers(eventId);
    setUsers(response.users);
  };
  useEffect(() => {
    
    if (isModalOpen) getUsers();
  }, [isModalOpen, eventId]);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  console.log(users, "users");

  const handleAddMember = async (userId: any) => {
    console.log(userId);
    const response: any = await createHost(eventId, userId);
    console.log(response);
    if (response.msg) {
      // remove user from not in subevent and add to in subevent
      getUsers()
    }
  };

  const handleRemoveMember = async (userId: any) => {
    console.log(userId);
    const response: any = await removeHost(eventId, userId);
    console.log(response);
    if (response.msg) {
      // remove user from not in subevent and add to in subevent
      getUsers()
    }
  };

//   const handleRemoveMember = async (userId: any) => {
//     console.log(userId);
//     const response: any = await removeMember(subEventId, userId);
//     console.log(response);
//     // console.log(response.);
//     if (response.msg) {
//       // remove user from not in subevent and add to in subevent
//       const user = users.hosts.find((user: any) => user._id === userId);
//       users.hosts((prev: any) =>
//         prev.filter((user: any) => user._id !== userId)
//       );
//       users.guests((prev: any) => [...prev, user]);
//     }
//   };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Guest List
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold px-6 py-4">Hosts</h2>
            {users?.hosts?.length > 0 ? (
              users.hosts.map((member: any) => (
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200" key={member.id}>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                      <span className="text-zinc-500">{member.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-md font-bold">{member.name}</p>
                      <p className="text-zinc-500 text-sm">{member.email}</p>
                    </div>
                  </div>
                  <Button onClick={() => handleRemoveMember(member?._id)} variant={null} color="error">
                    <PersonRemoveIcon className="ml-2" />
                  </Button>
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
              Guests
            </h2>
            {users?.guests?.length > 0 ? (
              users?.guests?.map((member: any) => (
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200" key={member.id}>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                      <span className="text-zinc-500">{member.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-md font-bold">{member.name}</p>
                      <p className="text-zinc-500 text-sm">{member.email}</p>
                    </div>
                  </div>
                  <Button onClick={() => handleAddMember(member?._id)} variant={null} color="primary">
                    <PersonAddIcon className="ml-2" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex items-center ml-8">
                <p className="text-zinc-500">No members to add - Invite more members to this event</p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold px-6 py-4">Vendors</h2>
            {users?.vendors?.length > 0 ? (
              users.vendors.map((member: any) => (
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200" key={member.id}>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                      <span className="text-zinc-500">{member.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-md font-bold">{member.name}</p>
                      <p className="text-zinc-500 text-sm">{member.email}</p>
                    </div>
                  </div>
                  
                </div>
              ))
            ) : (
              <div className="flex items-center ml-8">
                <p className="text-zinc-500">No members have been added</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EventMemberModal;