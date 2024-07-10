import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FC } from "react";

interface ContactMessageSentDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const ContactMessageSentDialog: FC<ContactMessageSentDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-96 p-8 space-y-4">
        <h1 className="text-xl lg:text-2xl text-primary mb-2">
          Assalamualaikum,
        </h1>

        <p className="text-lg text-primary font-semibold">
          Any of Our team member will contact you as soon as possible.
        </p>

        <h1 className="text-lg text-primary">
          Jazakumullah khair form contact us.{" "}
        </h1>
      </DialogContent>
    </Dialog>
  );
};

export default ContactMessageSentDialog;
