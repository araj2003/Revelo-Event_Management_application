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
import { Textarea } from "@/components/ui/textarea";

import { useModal } from "@/hooks/user-modal";
import { createEvent } from "@/api";

const formSchema = z.object({
  serverName: z.string().min(1, {
    message: "Channel name is required",
  }),
  description: z.string().min(6, {
    message: "description is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const CreateEventModal = () => {
  const { isOpen, onClose, type } = useModal();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serverName: "",
      description: "",
    },
  });

  const isModalOpen = isOpen && type === "createEvent";
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormValues) => {
    console.log(values);
    const response: any = await createEvent(values);
    console.log(response);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };
  // console.log('a');

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl  text-center font-bold">
              Create an Event
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Event are where your members communicate. They’re best when
              organized around a topic.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name={"serverName"}
                  // channelName="name"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel className="uppercase text-zinc-500 font-bold text-xs">
                          Event Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            placeholder="Enter Event name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"description"}
                  // channelName="name"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel className="uppercase text-zinc-500 font-bold text-xs">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            placeholder="Description of the event"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>
              <DialogFooter className="bg-gray-100 px-6 py-6">
                <Button
                  variant={null}
                  disabled={isLoading}
                  className="bg-purple-500 text-white"
                >
                  Create Event
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateEventModal;
