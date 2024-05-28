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
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useModal } from "@/hooks/user-modal";
import { EventContext } from "@/context/EventContext";
import { useContext, useEffect, useState } from "react";
import { createInvite } from "@/api";
import { toast } from "react-toastify";

const formSchema = z.object({});

type FormValues = z.infer<typeof formSchema>;

const InviteMemberModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { eventId } = useContext(EventContext);
  const [inviteCode, setInviteCode] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const isModalOpen = isOpen && type === "inviteMember";
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: FormValues) => {
    console.log(values);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    const getInvite = async () => {
      if (isModalOpen) {
        const inviteData = {
          eventId,
        };
        const response: any = await createInvite(inviteData);
        console.log(response);
        setInviteCode(response.invite.inviteCode);
      }
    };
    getInvite();
  }, [isModalOpen]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl  text-center font-bold">
            Invite Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Invite members to join your event
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <Input
                disabled={true}
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                placeholder="Copy invite link"
                value={`${window.location.origin}/join/${inviteCode}`}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-6">
              <Button
                variant={null}
                disabled={isLoading}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/join/${inviteCode}`
                  );
                  toast.success("Invite link copied to clipboard");
                }}
                className="bg-purple-500 text-white"
              >
                Copy Invite Link
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberModal;
