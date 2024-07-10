import { API_BASE_URL } from "../url";

export const getHeroBannerToView = async () => {
  const res = await fetch(
    `${API_BASE_URL}/hero-banners/view`
  );
  return res.json();
};

export const getHeroBannerToViewCard = async () => {

  const res = await fetch(
    `${API_BASE_URL}/hero-banners/view/card`
  );
  return res.json();
};

export const getHeroBannerConfig = async (id: string) => {
  const res = await fetch(
    `${API_BASE_URL}/hero-banners/${id}/config`
  );
  return res.json();
};

// mutations

export const createHeroBanner = async ({
  portfolio_id,
  accessToken,
}: {
  portfolio_id: string;
  accessToken: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/hero-banners`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ portfolio_id }),
    credentials: "include",
  });
  return res.json();
};

export const updateHeroBanner = async ({
  id,
  config,
  accessToken,
}: {
  id: string;
  config: {
    active: boolean;
    backgroundColor: string;
    headingTextColor: string;
    descriptionTextColor: string;
    linkTextColor: string;
    imageQuality: number;
  };
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/hero-banners/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ config }),
      credentials: "include",
    }
  );
  return res.json();
};

export const removeHeroBanner = async ({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/hero-banners/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }
  );
  return res.json();
};
