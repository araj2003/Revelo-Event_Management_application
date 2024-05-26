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
import { useContext } from "react";
import { createSubEvent } from "@/api";
// import { EventContext } from "@/context/EventContext";

// const {eventId} = useContext(EventContext)

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Subevent name is required",
  }),
  description: z.string().min(1, {
    message: "Subevent description is required",
  }),
  startDate: z.string().refine((date) => {
    return new Date(date) > new Date();
  }),
  endDate: z.string().refine((date) => {
    return new Date(date) > new Date();
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SubEventModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { eventId } = useContext(EventContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  });

  const isModalOpen = isOpen && type === "createSubevent";
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: FormValues) => {
    // console.log(values);
    const data = {
      subEventName : values.name,
      subEventDate : values.startDate,
      subEventTime: values.endDate,
      eventId:eventId
    }
    console.log(data)
    const result = await createSubEvent(data)
    console.log(result)
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
            Create a subevent
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Create a new subevent for this event
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              {/* <div className='flex -items-center justify-center text-center'>

                        </div> */}
              <FormField
                control={form.control}
                name={"name"}
                // channelName="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-zinc-500 font-bold text-xs">
                      Subevent Name
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
              <FormField
                control={form.control}
                name={"startDate"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-zinc-500 font-bold text-xs">
                      Start Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"endDate"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-zinc-500 font-bold text-xs">
                      End Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-6">
              <Button
                variant={null}
                disabled={isLoading}
                className="bg-purple-500"
              >
                Create Subevent
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SubEventModal;
