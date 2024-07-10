"use client";
import {} from "@radix-ui/react-dropdown-menu";
import { FC, useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/global/button-loader";
import { cn } from "@/lib/utils";

interface Status {
  active: boolean;
  featured: boolean;
}

interface ReviewStatusEditFormDialogAdminProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  statusData: Status;
  isPending: boolean;
  submitHandle: (status: Status) => void;
  deleteHandle: () => void;
  isDeleting: boolean;
}

const ReviewStatusEditFormDialogAdmin: FC<
  ReviewStatusEditFormDialogAdminProps
> = ({
  open,
  onOpenChange,
  statusData,
  isPending,
  submitHandle,
  deleteHandle,
  isDeleting,
}) => {
  const [status, setStatus] = useState<Status>(statusData);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
        setStatus(statusData);
      }}
    >
      <DialogContent
        className={cn("w-56", {
          "animate-pulse duration-1000": isDeleting,
        })}
      >
        <div className="grid grid-cols-2 gap-4">
          <Label htmlFor="active" className="cursor-pointer">
            Active
          </Label>
          <Checkbox
            id="active"
            checked={status?.active}
            onCheckedChange={(e: boolean) =>
              setStatus({ featured: status?.featured!, active: e })
            }
          />
          <Label htmlFor="featured" className="cursor-pointer">
            Featured
          </Label>
          <Checkbox
            id="featured"
            checked={status?.featured}
            onCheckedChange={(e: boolean) =>
              setStatus({ active: status?.active!, featured: e })
            }
          />
          <div className="col-span-2">
            <Button
              disabled={isPending || isDeleting}
              onClick={() => submitHandle(status)}
              className="w-full"
              size="sm"
            >
              {isPending ? <ButtonLoader text="Saving..." /> : "Save"}
            </Button>
          </div>
          <div className="col-span-2">
            <button
              onClick={deleteHandle}
              disabled={isDeleting || isPending}
              className="text-red-400 hover:text-red-500 duration-100"
            >
              {isDeleting ? <ButtonLoader text="Deleting..." /> : "Delete"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewStatusEditFormDialogAdmin;
