import RichTextEditor from "@/components/global/rich-text-editor";
import { usePortfolioTexts } from "@/components/hooks/react-query/portfolios/queries";
import { FC } from "react";

interface PortfolioViewTextsProps {
  slug: string;
}

const PortfolioViewTexts: FC<PortfolioViewTextsProps> = ({ slug }) => {
  const { data, isLoading, isError, error } = usePortfolioTexts(slug);

  return (
    <div className="h-full w-full space-y-8">
      <h1 className="text-primary/80 text-portfolioTitle md:text-portfolioTitleMd lg:text-portfolioTitleLg font-semibold leading-none">
        {data?.portfolio?.title}
      </h1>
      <RichTextEditor value={data?.portfolio?.description!} readOnly={true} />
    </div>
  );
};

export default PortfolioViewTexts;
