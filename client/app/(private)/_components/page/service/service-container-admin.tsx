import { FC } from "react";
import ServiceCardsAdmin from "./service-cards-admin";
import AddServiceDialog from "./add-service-dialog";

interface ServiceContainerAdminProps {}

const ServiceContainerAdmin: FC<ServiceContainerAdminProps> = ({}) => {
  return (
    <div className="h-full w-full space-y-4 p-4">
    <div className="h-fit w-full py-4 flex items-center justify-between">
      <h1 className="text-xl lg:text-2xl">Manage services</h1>
      <AddServiceDialog>
        <span className="h-fit w-fit px-6 py-3 bg-primary hover:bg-primary/80 duration-100 cursor-pointer text-primary-foreground">
          Add
        </span>
      </AddServiceDialog>
    </div>
    <ServiceCardsAdmin />
  </div>
  );
};

export default ServiceContainerAdmin;
