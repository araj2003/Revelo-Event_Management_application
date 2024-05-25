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

const formSchema = z.object({
  channelName: z.string().min(1, {
    message: "Channel name is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ChannelModal = () => {
  const { isOpen, onClose, type } = useModal();

  // const isModalOpen = isOpen;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channelName: "",
    },
  });

  const isModalOpen = isOpen && type === "createChannel";
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: FormValues) => {
    console.log(values);
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
            Create a channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Channels are where your members communicate. They’re best when
            organized around a topic.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              {/* <div className='flex -items-center justify-center text-center'>

                        </div> */}
              <FormField
                control={form.control}
                name={"channelName"}
                // channelName="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-zinc-500 font-bold text-xs">
                      Channel Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-6">
              <Button variant={null} disabled={isLoading} className="bg-purple-500">
                Create Channel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelModal;
