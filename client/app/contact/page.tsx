import ContactForm from "@/components/pages/contact/contact-form";
import { FC } from "react";

interface ContactProps {}

const Contact: FC<ContactProps> = ({}) => {
  return (
    <div className="p-4 lg:px-24">
      <div>
        {/* first tagline */}
        <h1 className="text-bannerHead md:text-bannerHeadMd lg:text-bannerHeadLg text-primary/80  leading-tight">
          Contact us.
        </h1>

        {/* underline */}
        <div className="py-4 flex items-center">
          <div className="h-2 w-16 bg-accent2" />
        </div>

        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
