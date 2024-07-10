'use client'
import { FC } from "react";
import AddHeroBannerDialog from "./add-hero-banner-dialog";
import HeroBannersCardsAdmin from "./hero-banners-cards-admin";

interface HeroBannersAdminProps {}

const HeroBannersAdmin: FC<HeroBannersAdminProps> = ({}) => {

  
  return (
    <div className="h-full w-full p-4 space-y-4">
      <div className="h-fit w-full py-4 flex items-center justify-between">
        <h1 className="text-xl lg:text-2xl">Manage hero banners</h1>
        <AddHeroBannerDialog>
          <span className="h-fit w-fit px-6 py-3 bg-primary hover:bg-primary/80 duration-100 cursor-pointer text-primary-foreground">
            Add
          </span>
        </AddHeroBannerDialog>
      </div>
      <HeroBannersCardsAdmin />
    </div>
  );
};

export default HeroBannersAdmin;

