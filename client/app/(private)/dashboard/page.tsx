import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4 p-4 lg:px-24">
      <Link prefetch={false} href="/dashboard/services">
        <Button>Mange services</Button>
      </Link>
      <Link prefetch={false} href="/dashboard/portfolios">
        <Button>Manage Portfolios</Button>
      </Link>
      <Link prefetch={false} href="/dashboard/hero-banners">
        <Button>Manage Hero banners</Button>
      </Link>
      <Link prefetch={false} href="/dashboard/reviews">
        <Button>Manage Reviews</Button>
      </Link>
    </div>
  );
};

export default Dashboard;
