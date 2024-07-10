import { API_BASE_URL } from "../url";

export const fetchServiceForView = async (slug: string) => {
  const response = await fetch(
    `${API_BASE_URL}/services/${slug}/view`
  );
  return response.json();
};

export const fetchServicesForCard = async () => {
  const res = await fetch(
    `${API_BASE_URL}/services/view/card`
  );
  return res.json();
};

export const fetchServiceTextsAdmin = async (slug: string) => {
  const res = await fetch(
    `${API_BASE_URL}/services/${slug}/texts`
  );
  return res.json();
};

export const fetchServicesRelatedPortfolio = async (slug: string) => {
  const res = await fetch(
    `${API_BASE_URL}/services/${slug}/related_portfolios`
  );
  return res.json();
};

export const fetchServiceForCard = async () => {
  const response = await fetch(
    `${API_BASE_URL}/services/view/card`
  );
  return response.json();
};

export const getServiceRelatedPortfolios = async (slug: string) => {
  const res = await fetch(
    `${API_BASE_URL}/services/${slug}/related_portfolios`
  );
  return res.json();
};

export const getServiceRelatedServices = async (slug: string) => {
  const res = await fetch(
    `${API_BASE_URL}/services/${slug}/related_services`
  );
  return res.json();
};

// mutations

export const addService = async ({
  title,
  accessToken,
}: {
  title: string;
  accessToken: string;
}) => {

  const res = await fetch(`${API_BASE_URL}/service`, {
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

export const updateServiceTexts = async ({
  slug,
  serviceTexts,
  accessToken,
}: {
  slug: string;
  accessToken: string;
  serviceTexts: {
    title: string;
    description: string;
    short_description: string;
    featured: boolean;
    active: boolean;
  };
}) => {
  const response = await fetch(
    `${API_BASE_URL}/services/${slug}/update?type=texts`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...serviceTexts }),
    }
  );
  return response.json();
};

export const addRelatedPortfoliosToService = async ({
  slug,
  related_portfolio_ids,
  accessToken,
}: {
  slug: string;
  related_portfolio_ids: string[];
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/services/${slug}/update?type=add_related_portfolios`,
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

export const addRelatedServicesToService = async ({
  slug,
  related_services_ids,
  accessToken,
}: {
  slug: string;
  related_services_ids: string[];
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/services/${slug}/update?type=add_related_services`,
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

export const removeRelatedPortfolioFromService = async ({
  slug,
  related_portfolio_id,
  accessToken,
}: {
  slug: string;
  related_portfolio_id: string;
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/services/${slug}/update?type=remove_related_portfolio`,
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

export const removeRelatedServiceFromService = async ({
  slug,
  related_service_id,
  accessToken,
}: {
  slug: string;
  related_service_id: string;
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/services/${slug}/update?type=remove_related_service`,
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

export const deleteService = async ({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/services/${id}`,
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