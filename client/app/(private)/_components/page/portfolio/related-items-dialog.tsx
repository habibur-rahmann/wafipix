import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PortfolioForCard, ServiceForCard } from "@/types/types";
import { FC } from "react";
import RelatedItemCard from "./related-item-card";
import { Button } from "@/components/ui/button";
import InputMessage from "@/components/global/input-message";
import ButtonLoader from "@/components/global/button-loader";

interface RelatedItemsDialogProps {
  children: React.ReactNode;
  items: PortfolioForCard[] | ServiceForCard[];
  selectedItems: PortfolioForCard[] | ServiceForCard[];
  removeHandle: (id: string) => void;
  selectHandle: (id: string) => void;
  onSave: (items: PortfolioForCard[] | ServiceForCard[]) => void;
  isSaving: boolean;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const RelatedItemsDialog: FC<RelatedItemsDialogProps> = ({
  children,
  items,
  selectedItems,
  removeHandle,
  selectHandle,
  onSave,
  isSaving,
  open,
  onOpenChange,
}) => {
  const isSelected = (itemId: string) =>
    selectedItems.find((selectedItem) => selectedItem._id === itemId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <div className="space-y-6">
          {/* selected items */}
          <div className="space-y-4">
            <h1 className="text-lg mb-2">Selected items</h1>
            <div className="max-h-72 overflow-y-auto space-y-2">
              {selectedItems?.map((item) => {
                return (
                  <RelatedItemCard
                    item={item}
                    key={`selected${item._id}`}
                    mode="remove"
                    onActionClick={removeHandle}
                  />
                );
              })}
            </div>
            {selectedItems.length ? (
              <Button
                variant={"secondary"}
                onClick={() => onSave(selectedItems)}
              >
                {isSaving ? <ButtonLoader text="Saving..." /> : "Save"}
              </Button>
            ) : (
              <InputMessage message="Please select an item" />
            )}
          </div>
          {/* all items */}
          <div className="max-h-72 overflow-y-auto space-y-2">
            <h1 className="text-lg mb-2">Select portfolios from below</h1>
            {items?.map((item) => {
              if (isSelected(item._id)) return null;
              return (
                <RelatedItemCard
                  item={item}
                  key={`unselected${item._id}`}
                  mode="select"
                  onActionClick={selectHandle}
                />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RelatedItemsDialog;
