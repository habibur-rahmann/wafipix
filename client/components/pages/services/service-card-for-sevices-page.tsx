import RedirectButton from "@/components/global/buttons/redirect-button";
import { cn, getShortParagraph } from "@/lib/utils";
import { ServiceForCard } from "@/types/types";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

interface ServiceCardForServicePageProps
  extends HTMLAttributes<HTMLDivElement> {
  service: ServiceForCard;
  button?: boolean;
}

const ServiceCardForServicePage: FC<ServiceCardForServicePageProps> = ({
  service: { title, short_description, slug },
  button = true,
  className,
  ...props
}) => {
  const shortDesc = getShortParagraph({
    str: short_description!,
    maxLength: 200,
    suffix: "...",
  });

  return (
    <div
      {...props}
      className={cn("flex flex-col gap-2 w-full h-fit lg:p-4", className)}
    >
      <Link href={`/services/#${slug}`} className="w-fit">
        <h1
          id={slug}
          className=" w-fit scroll-mt-4 lg:scroll-mt-12 text-articleTitle md:text-articleTitleMd lg:text-articleTitleLg text-primary hover:underline duration-300"
        >
          <span>#</span> {title}
        </h1>
      </Link>

      <div className="w-full h-fit">
        <p className="text-articlePara md:text-articleParaMd lg:text-articleParaLg text-primary/70">
          {shortDesc}
        </p>
      </div>
      {button ? (
        <RedirectButton
          href={`/services/${slug}`}
          title="Learn more..."
          className="bg-secondary hover:bg-secondary/80 hover:outline-primary/80 text-primary hover:text-primary/80 duration-300 w-fit mt-2"
        />
      ) : null}
    </div>
  );
};

export default ServiceCardForServicePage;
