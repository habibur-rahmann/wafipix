"use client";
import { FC, useEffect, useState } from "react";
import { PortfolioForCard } from "@/types/types";
import RelatedItemsDialog from "../portfolio/related-items-dialog";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { useToast } from "@/components/ui/use-toast";
import { useAddRelatedPortfoliosToServiceMutation } from "@/components/hooks/react-query/services/mutations";

interface AddRelatedPortfoliosDialogProps {
  children: React.ReactNode;
  items: PortfolioForCard[];
  slug: string;
}

const AddRelatedPortfoliosDialog: FC<AddRelatedPortfoliosDialogProps> = ({
  children,
  items,
  slug,
}) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isOpenDialog, setOpenDialog] = useState<boolean>(false);

  const { toast } = useToast();

  const user = useCurrentuser();

  const { mutate, data, isPending, isSuccess, isError, error } =
    useAddRelatedPortfoliosToServiceMutation();

  const isSelected = (itemId: string) =>
    selectedItems.find((selectedItem) => selectedItem._id === itemId);

  const removeHandle = (id: string) => {
    const newItems = selectedItems.filter((item) => item._id !== id);
    setSelectedItems(newItems);
  };

  const selectHandle = (id: string) => {
    const item = items.find((item) => item._id === id);

    if (isSelected(id)) return;

    if (item) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const saveHandle = (items: any[]) => {
    if (!items || !items?.length) return null;

    const ids = items?.map((item) => item?._id);

    mutate({
      slug: slug,
      related_portfolio_ids: ids,
      accessToken: user?.accessToken!,
    });
  };

  const handleCloseDialog = (value: boolean) => {
    setOpenDialog(value);
    setSelectedItems([]);
  };

  useEffect(() => {
    if (isSuccess && data?.success) {
      toast({
        title: "Service Saved!",
        description: "Related portfolios added to this service successfully.",
      });
      handleCloseDialog(false);
    }
    if (isError || (data && !data?.success)) {
      toast({
        variant: "destructive",
        title: "Service Saved Failed!",
        description: error?.message || data?.message,
      });
    }
  }, [isSuccess, isError, error, toast, data]);

  return (
    <RelatedItemsDialog
      items={items}
      selectedItems={selectedItems}
      selectHandle={selectHandle}
      removeHandle={removeHandle}
      onSave={saveHandle}
      isSaving={isPending}
      open={isOpenDialog}
      onOpenChange={handleCloseDialog}
    >
      {children}
    </RelatedItemsDialog>
  );
};

export default AddRelatedPortfoliosDialog;
