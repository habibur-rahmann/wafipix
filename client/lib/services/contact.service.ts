import { API_BASE_URL } from "../url";

export const sendContactMail = async ({
  name,
  email,
  message,
  phone,
  sourceOfCustomer,
  isSubscribe,
}: {
  name: string;
  email: string;
  phone: string | undefined;
  sourceOfCustomer: string;
  message: string;
  isSubscribe: boolean;
}) => {
  const response = await fetch(
    `${API_BASE_URL}/email/contact`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        phone,
        sourceOfCustomer,
        isSubscribe,
      }),
      credentials: "include",
    }
  );

  return response.json();
};
