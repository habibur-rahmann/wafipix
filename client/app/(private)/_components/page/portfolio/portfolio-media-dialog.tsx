import ButtonLoader from "@/components/global/button-loader";
import VideoPlayer from "@/components/global/video-player";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Check, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
interface Data {
  media: File | undefined;
  view_size: "full" | "half" | "quarter" | "three-fourth";
}

interface PortfolioMediaDialogProps {
  children: React.ReactNode;
  portfolio_id: string;
  onSave: (data: Data) => void;
  isPending: boolean;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  uploadStatus: "failed" | "success" | "pending" | null;
  progress: number;
}

const PortfolioMediaDialog: FC<PortfolioMediaDialogProps> = ({
  children,
  portfolio_id,
  isPending,
  open,
  onOpenChange,
  onSave,
  uploadStatus,
  progress,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<Data>({
    media: undefined,
    view_size: "full",
  });

  const { toast } = useToast();

  const removeCurrentMediaHandle = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
    setData({ ...data, media: undefined });
  };

  const mediaChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e?.target;
    if (target?.files?.length) setData({ ...data, media: target?.files[0] });
  };

  const viewSizeSelectHandle = (e: any) => setData({ ...data, view_size: e });

  const saveHandle = () => {
    if (!data?.view_size || !data?.media)
      return toast({ title: "View size and media required!" });
    if (!portfolio_id) return toast({ title: "!portfolio id required!" });
    onSave(data);
  };

  useEffect(() => {
    if (uploadStatus === "success") {
      setData({ view_size: "full", media: undefined });
    }
  }, [uploadStatus]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="space-y-6 m-y-2">
          <div className="space-y-4">
            {/* image field */}
            <div className="min-h-56 w-full aspect-video relative">
              {data?.media?.type.includes("image") ? (
                <Image
                  src={data?.media
                      ? URL.createObjectURL(data?.media!)
                      : ""
                  }
                  fill
                  className="object-contain"
                  alt=""
                />
              ) : data?.media?.type?.includes("video") ? (
                <VideoPlayer
                  sources={[
                    {
                      src: URL.createObjectURL(data?.media),
                      type: data?.media?.type,
                    },
                  ]}
                  isVolumeControl
                />
              ) : null}
              {data?.media ? (
                <Button
                  onClick={removeCurrentMediaHandle}
                  variant={"secondary"}
                  size={"icon"}
                  className="group z-20 absolute top-2 right-2"
                >
                  <Trash2 className="h-4 w-4 text-primary/70 group-hover:text-red-500 duration-100" />
                </Button>
              ) : (
                <div
                  onClick={() => fileInputRef?.current?.click()}
                  className="abosolute z-10 top-0 left-0 h-full group hover:bg-primary/40 w-full duration-100 cursor-pointer flex flex-col gap-4 items-center justify-center"
                >
                  <span className="text-lg text-primary/80 group-hover:text-primary/90">
                    Upload Media
                  </span>{" "}
                  <Upload className="h-8 w-8 text-primary/70 group-hover:text-primary/90 duration-100" />
                </div>
              )}
              <Input
                type="file"
                className="hidden"
                accept="image/*,video/*"
                ref={fileInputRef}
                onChange={mediaChangeHandle}
              />
            </div>
            {/* view_size field */}
            <div className="flex items-center gap-4">
              <Label htmlFor="view_size" className="w-24 h-fit">
                View size
              </Label>
              <Select
                defaultValue={"full"}
                onValueChange={viewSizeSelectHandle}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent id="view_size">
                  <SelectItem value="full">Full</SelectItem>
                  <SelectItem value="half">Half</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="three-fourth">Three-Fourth</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              disabled={uploadStatus === "pending" || isPending}
              onClick={saveHandle}
              variant={"secondary"}
            >
              {uploadStatus === "pending" ? (
                <ButtonLoader text="Saving..." />
              ) : (
                "Save"
              )}
            </Button>
            {uploadStatus === "pending" ? (
              <span className="font-semibold text-emerald-400">
                {progress + " %"}
              </span>
            ) : uploadStatus === "failed" ? (
              <span className="font-semibold text-red-400">
                uploading failed!
              </span>
            ) : uploadStatus === "success" ? (
              <Check className=" text-emerald-400 h-6 w-6" />
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioMediaDialog;
