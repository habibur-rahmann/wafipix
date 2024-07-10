export type Portfolio = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  profile_image: string;
  medias: Media[];
  related_portfolios: string[];
  related_services: string[];
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  active: boolean;
};

export type PortfolioTexts = {
  _id: string;
  title: string;
  description: string;
  short_description: string;
  featured: boolean;
  active: boolean;
};

export type Media = {
  _id: string;
  secure_url: string;
  public_id: string;
  height: number;
  width: number;
  content_type: string;
  type: string;
  size?: number;
  duration?: number;
  title?: string;
  description?: string;
};

export type Service = {
  title: string;
  description: string;
  slug: string;
  short_description: string;
  related_projects: number[] | Portfolio[]; // number means id of projects
  related_services: number[] | Service[];
};

export type CardSlide = {
  title: string;
  image_url: string;
  slug: string;
};

// react query datas
export type HeroSlidersView = {
  _id: string;
  title: string;
  slug: string;
  short_description: string;
  active: boolean;
  config: {
    backgroundColor: string;
    headingTextColor: string;
    descriptionTextColor: string;
    linkTextColor: string;
    imageQuality: number;
  };
  image_url: string;
};
// react query datas
export type HeroSlidersViewCard = {
  _id: string;
  portfolio_id: string;
  title: string;
  slug: string;
  active: boolean;
};

export type HeroSliderConfig = {
  _id: string;
  backgroundColor: string;
  headingTextColor: string;
  descriptionTextColor: string;
  linkTextColor: string;
  imageQuality: number;
  active: boolean;
};

export type FeaturedPortfolios = {
  _id: string;
  title: string;
  slug: string;
  image_url: string;
  active: boolean;
  featured: boolean;
};

export type PortfolioForCard = {
  _id: string;
  title: string;
  slug: string;
  image_url: string;
};

export type PortfolioViewMedia = {
  view_size: "full" | "half" | "quarter" | "three-fourth";
  url: string;
  content_type: string;
};
export type PortfolioForView = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  medias: PortfolioViewMedia[];
};

export type ServiceForView = {
  _id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  related_services: {
    _id: string;
    title: string;
    slug: string;
  }[];
  related_portfolios: {
    _id: string;
    title: string;
    slug: string;
  }[];
};
export type ServiceForCard = {
  _id: string;
  title: string;
  slug: string;
  featured: boolean;
  short_description: string;
};

export type ReviewForCard = {
  _id: string;
  star: number;
  text: string;
  user_name: string;
  user_picture: string;
};
export type AllReview = {
  _id: string;
  star: number;
  text: string;
  user_name: string;
  user_picture: string;
  active: boolean,
  featured: boolean
};

export type ReviewStatus = {
  _id: string;
  active: boolean;
  featured: boolean;
};

export type ServiceTextsAdmin = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  active: boolean;
  featured: boolean;
};
