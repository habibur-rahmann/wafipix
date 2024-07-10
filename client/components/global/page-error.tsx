import { FC } from "react";

interface PageErrorProps {
  error?: string;
}

const PageError: FC<PageErrorProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="min-h-96 flex items-center justify-center">
      <p className="text-destructive text-base italic text-center">{error}</p>
    </div>
  );
};

export default PageError;
