import { Loader2 } from "lucide-react";
import { FC } from "react";

interface ButtonLoaderProps {
  text?: string;
}

const ButtonLoader: FC<ButtonLoaderProps> = ({ text }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="w-6 h-6 text-primary/60 animate-spin duration-300" />
      {text ? (
        <span className="text-base text-muted-foreground">{text}</span>
      ) : null}
    </div>
  );
};

export default ButtonLoader;
