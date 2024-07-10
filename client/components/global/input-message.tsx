import { FC } from "react";

interface InputMessageProps {
  message?: string;
}

const InputMessage: FC<InputMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="w-fit h-auto">
      <span className="w-full bg-destructive/5 px-2 rounded text-destructive italic text-sm font-light">
        {message}
      </span>
    </div>
  );
};

export default InputMessage;
