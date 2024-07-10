import { API_BASE_URL } from "../url";

export const getPortfolios = async () => {

  const res = await fetch(`${API_BASE_URL}/portfolios`);
  return res.json();
};

export const getPortfolio = async (slug: string) => {

  const res = await fetch(
    `${API_BASE_URL}/portfolios/card/${slug}`
  );
  return res.json();
};

export const getPortfolioTexts = async (slug: string) => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/card/${slug}/texts`
  );
  return res.json();
};

export const getPortfolioProfile = async (slug: string) => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/${slug}/profile_image`
  );

  return res.json();
};

export const getPortfolioMedias = async (slug: string) => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/${slug}/medias`
  );
  return res.json();
};

export const getPortfoliosForCard = async () => {
  const res = await fetch(`${API_BASE_URL}/portfolios/card`);
  return res.json();
};

export const getPortfoliosForCardAll = async () => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/card/all`
  );
  return res.json();
};

export const getFeaturedPortfolios = async () => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/featured`
  );
  return res.json();
};

export const getPortfolioRelatedPortfolios = async (slug: string) => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/${slug}/related_portfolios`
  );
  return res.json();
};

export const getPortfolioRelatedServices = async (slug: string) => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/${slug}/related_services`
  );
  return res.json();
};

// mutations
export const addPortfolio = async ({
  title,
  accessToken,
}: {
  title: string;
  accessToken: string;
}) => {

  const res = await fetch(`${API_BASE_URL}/portfolio`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ title }),
    credentials: "include",
  });
  return res.json();
};

export const updatePortfolioTexts = async ({
  data,
  accessToken,
}: {
  data: {
    _id: string;
    title: string;
    short_description: string;
    description: string;
    featured: boolean;
    active: boolean;
  };
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/${data?._id}/update?type=texts`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );
  return res.json();
};

export const addRelatedPortfoliosToPortfolio = async ({
  id,
  related_portfolio_ids,
  accessToken,
}: {
  id: string;
  related_portfolio_ids: string[];
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/${id}/update?type=add_related_portfolios`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ related_portfolio_ids: related_portfolio_ids }),
      credentials: "include",
    }
  );
  return res.json();
};

export const addRelatedServicesToPortfolio = async ({
  id,
  related_services_ids,
  accessToken,
}: {
  id: string;
  related_services_ids: string[];
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/${id}/update?type=add_related_services`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ related_service_ids: related_services_ids }),
      credentials: "include",
    }
  );
  return res.json();
};

export const removeRelatedPortfolioFromPortfolio = async ({
  id,
  related_portfolio_id,
  accessToken,
}: {
  id: string;
  related_portfolio_id: string;
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/${id}/update?type=remove_related_portfolio`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ related_portfolio_id }),
      credentials: "include",
    }
  );
  return res.json();
};

export const removeRelatedServiceFromPortfolio = async ({
  id,
  related_service_id,
  accessToken,
}: {
  id: string;
  related_service_id: string;
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/${id}/update?type=remove_related_service`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ related_service_id }),
      credentials: "include",
    }
  );
  return res.json();
};

export const addMediaToPortfolio = async ({
  id,
  media,
  view_size,
  accesToken,
}: {
  id: string;
  media: File;
  view_size: "full" | "half" | "quarter" | "three-fourth";
  accesToken: string;
}) => {
  const formData = new FormData();

  formData.append("view_size", view_size);
  formData.append("media", media);

  const res = await fetch(
    `${API_BASE_URL}/portfolios/${id}/add_media`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
      body: formData,
      credentials: "include",
    }
  );
  return res.json();
};

export const removeMediaFromPortfolio = async ({
  id,
  medias_item_id,
  accesToken,
}: {
  id: string;
  medias_item_id: string;
  accesToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/${id}/remove_media`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accesToken}`,
      },
      body: JSON.stringify({ medias_item_id }),
      credentials: "include",
    }
  );
  return res.json();
};

export const updatePortfolioProfile = async ({
  id,
  profile_image,
  accessToken,
}: {
  id: string;
  profile_image: File;
  accessToken: string;
}) => {
  const formData = new FormData();

  formData.append("profile_image", profile_image);

  const res = await fetch(
    `${API_BASE_URL}/portfolios/${id}/update_profile_image`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
      credentials: "include",
    }
  );

  return res.json();
};

export const deletePortfolio = async ({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/portfolios/${id}`,
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
