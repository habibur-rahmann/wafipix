import Script from "next/script";
import { FC } from "react";

interface TawkMessangerProps {}

const TawkMessanger: FC<TawkMessangerProps> = ({}) => {
  const propertyId = process.env.TAWAKTO_PROPERTY_ID;
  const widgetId = process.env.TAWAKTO_WIDGET_ID;
  return (
    <div>
      <Script
        id="tawkTo"
        strategy="afterInteractive"
        src={`https://embed.tawk.to/${propertyId}/${widgetId}`}
      />
    </div>
  );
};

export default TawkMessanger;
