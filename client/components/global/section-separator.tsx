import { FC } from "react";

interface SectionSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const SectionSeparator: FC<SectionSeparatorProps> = ({ ...props }) => {
  return (
    <div
      {...props}
      className={`min-h-12 md:min-h-16 lg:min-h-24 w-full bg-transparent ${props.className}`}
    />
  );
};

export default SectionSeparator;
