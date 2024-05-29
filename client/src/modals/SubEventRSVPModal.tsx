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

const formSchema = z.object({
  title: z.string().min(1, {
    message: "RSVP title is required",
  }),
  description: z.string().min(1, {
    message: "Subevent description is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SubEventRSVPModal = () => {
  const { isOpen, onClose, type, subEventId } = useModal();
  const [image, setImage] = useState<File | null>(null);
  const { eventId,fetchAllSubEvents } = useContext(EventContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const isModalOpen = isOpen && type === "addRSVP";
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: FormValues) => {
    console.log(values);
    console.log(image);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("rsvpImage", image as Blob);

    const result = await addRSVP(subEventId, formData);
    console.log(result)
    if (result) {
      form.reset();
      onClose();
      fetchAllSubEvents();
      handleClose();
    }
  };

  const handleClose = () => {
    form.reset();
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name={"title"}
                // channelName="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-zinc-500 font-bold text-xs">
                      RSVP Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Subevent name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"description"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppereact-hook-formrcase text-zinc-500 font-bold text-xs">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Subevent description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* image for rsvp */}
              <FormItem className="flex flex-col">
                <FormLabel className="uppercase text-zinc-500 font-bold text-xs">
                  Invitation Card
                </FormLabel>
                <input
                  disabled={isLoading}
                  type="file"
                  className="bg-zinc-300/50
                  p-3 rounded-md border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                  placeholder="Upload Image"
                  onChange={(e) => {
                    if (
                      e.currentTarget.files &&
                      e.currentTarget.files.length > 0
                    ) {
                      if (e.currentTarget.files[0].size > 4 * 1024 * 1024) {
                        e.currentTarget.value = "";
                        alert("File size should be less than 4MB");
                        return;
                      }
                      setImage(e.currentTarget.files[0]);
                    }
                  }}
                />
              </FormItem>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-6">
              <Button
                variant={null}
                disabled={isLoading}
                className="bg-purple-500 text-white"
              >
                Send RSVP
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SubEventRSVPModal;
