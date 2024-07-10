import { ReviewForCard } from "@/types/types";
import { API_BASE_URL } from "../url";

export const fetchReviewsToView = async () => {
  const res = await fetch(`${API_BASE_URL}/reviews/view`);
  return res.json();
};

export const getAllReviews = async (accessToken: string) => {
  const res = await fetch(
    `${API_BASE_URL}/reviews/all/view`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }
  );
  return res.json();
};

export const fetchFeaturedReviews = async () => {
  const res = await fetch(
    `${API_BASE_URL}/reviews/featured`
  );
  return res.json();
};

export const fetchUserReviews = async (accessToken: string) => {
  const res = await fetch(
    `${API_BASE_URL}/reviews/view/user`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }
  );
  return res.json();
};

export const getReviewStatus = async ({
  accessToken,
  review_id,
}: {
  accessToken: string;
  review_id: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/reviews/${review_id}/status`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }
  );
  return res.json();
};

export const fetchOtherCustomersReviews = async () => {
  const res = await fetch(
    `${API_BASE_URL}/reviews/view/other_customers`
  );
  return res.json();
};

export const fetchUpdateReview = async ({
  access_token,
  review,
}: {
  review: ReviewForCard;
  access_token: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/reviews/${review._id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(review),
      credentials: "include",
    }
  );
  return res.json();
};

// mutations
export const updateReview = async ({
  review,
  access_token,
}: {
  review: ReviewForCard;
  access_token: string;
}) => {
  const response = await fetch(
    `${API_BASE_URL}/reviews/${review._id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ star: review.star, text: review.text }),
      credentials: "include",
    }
  );

  return response.json();
};

export const updateReviewStatus = async ({
  review_id,
  status,
  accessToken,
}: {
  review_id: string;
  status: { active: boolean; featured: boolean };
  accessToken: string;
}) => {
  const response = await fetch(
    `${API_BASE_URL}/reviews/${review_id}/status`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
      credentials: "include",
    }
  );

  return response.json();
};

export const createReview = async ({
  review,
  access_token,
}: {
  review: { text: string; star: number };
  access_token: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/review`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({ star: review.star, text: review.text }),
    credentials: "include",
  });

  return response.json();
};

export const deleteReview = async ({
  review_id,
  accessToken,
}: {
  review_id: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${API_BASE_URL}/reviews/${review_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }
  );

  return response.json();
};
