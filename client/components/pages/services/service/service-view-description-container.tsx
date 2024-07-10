import RichTextEditor from "@/components/global/rich-text-editor";
import { FC } from "react";

interface ServiceViewDescriptionContainerProps {
  description: string;
  isLoading: boolean;
}

const ServiceViewDescriptionContainer: FC<
  ServiceViewDescriptionContainerProps
> = ({ description, isLoading = true }) => {
  if (isLoading)
    return (
      <div className=" w-full min-h-screen text-articlePara md:text-articleParaMd text-primary/80 text-justify lg:p-8 bg-secondary animate-pulse duration-1000"></div>
    );
  return (
    <div className="text-articlePara md:text-articleParaMd text-primary/80 text-justify lg:p-8 -mt-4">
      <RichTextEditor readOnly value={description} />
    </div>
  );
};

export default ServiceViewDescriptionContainer;
