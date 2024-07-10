import InputMessage from "@/components/global/input-message";
import { usePortfolioMedias } from "@/components/hooks/react-query/portfolios/queries";
import { FC } from "react";
import PortfolioGalleryAdmin from "./portfolio-gallery-admin";
import AddPortfolioMedia from "./add-portfolio-media";

interface PortfolioViewMediasProps {
  slug: string;
  portfolio_id: string;
}

const PortfolioViewMedias: FC<PortfolioViewMediasProps> = ({
  slug,
  portfolio_id,
}) => {
  const { data, isLoading, isError, error } = usePortfolioMedias(slug);

  if (isLoading) return LoadingUi();
  if (isError || !data?.success)
    return ErrorUi(error?.message || data?.message!);
  return (
    <div className="space-y-4">
      <h1 className="text-xl">Medias</h1>
      <PortfolioGalleryAdmin medias={data?.medias} portfolio_id={portfolio_id}/>
      <AddPortfolioMedia portfolio_id={portfolio_id} />
    </div>
  );
};

export default PortfolioViewMedias;

const LoadingUi = () => (
  <div className="min-h-screen w-full p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-2" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-2" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-1" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-1" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-1" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-1" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-3" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-1" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-4" />
  </div>
);

const ErrorUi = (message: string) => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <InputMessage message={message} />
  </div>
);
