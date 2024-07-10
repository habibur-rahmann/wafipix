import { FC } from "react";
import AddressBox from "../contact/address-box";
import ContactForm from "../contact/contact-form";
import { MotionH1 } from "@/lib/framer-motion";

interface HomeContactSectionProps {}

const HomeContactSection: FC<HomeContactSectionProps> = ({}) => {
  return (
    <div className="p-4 lg:p-24">
      <MotionH1 className="text-sectionTitle md:text-sectionTitleMd lg:text-sectionTitleMdLg py-4 font-semibold">
        {"Don't be shy..."}
      </MotionH1>
      <div className=" flex flex-col lg:flex-row gap-24 lg:gap-44 lg:justify-between">
        <AddressBox />
        <ContactForm />
      </div>
    </div>
  );
};

export default HomeContactSection;
