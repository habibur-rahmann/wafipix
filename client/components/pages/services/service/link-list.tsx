import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";
import { ClassNameValue } from "tailwind-merge";

interface LinkListProps extends React.HTMLProps<HTMLUListElement> {
  items: {
    title: string;
    slug: string;
  }[];
  preSlug: string;
  padding?: string;
}

const LinkList: FC<LinkListProps> = ({
  items,
  padding,
  preSlug,
  className,
  ...props
}) => {
  const List = items?.map((item) => {
    return (
      <li
        key={`linList_${item.slug}`}
        className={cn(
          "w-fit text-accent2/80 hover:text-accent2 duration-100 hover:underline",
          className
        )}
      >
        <Link
          href={preSlug + item?.slug || ""}
          className={cn("h-full w-full", padding)}
        >
          {item?.title}
        </Link>
      </li>
    );
  });
  return <ul>{List}</ul>;
};

export default LinkList;
