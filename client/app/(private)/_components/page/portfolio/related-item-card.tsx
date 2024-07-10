import { PortfolioForCard, ServiceForCard } from "@/types/types";
import { Check, Trash2 } from "lucide-react";
import { FC } from "react";

interface RelatedItemCardProps {
  mode?: "select" | "remove";
  onActionClick: (id: string) => void;
  item: PortfolioForCard | ServiceForCard;
}

const RelatedItemCard: FC<RelatedItemCardProps> = ({
  item,
  mode = "remove",
  onActionClick,
}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-secondary rounded select-none hover:bg-secondary/80 duration-100">
      <h1 className="text-lg">{item?.title}</h1>
      {mode === "remove" ? (
        <Trash2
          onClick={() => onActionClick(item._id)}
          className="h-6 w-6 text-primary/80 hover:text-destructive duration-100 cursor-pointer"
        />
      ) : (
        <Check
          onClick={() => onActionClick(item?._id)}
          className="h-6 w-6 text-primary/80 hover:text-green-500 duration-100 cursor-pointer"
        />
      )}
    </div>
  );
};

export default RelatedItemCard;
