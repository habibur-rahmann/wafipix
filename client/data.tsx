// mission tagline data

export const missionTaglineData = {
  tagline:
    "Our mission is simple - to create best design and increase your business",
};

export const videoData = {
  advertiseVideo: [
    {
      src: "https://res.cloudinary.com/dugc533jq/video/upload/f_auto:video,q_auto/v1/wafipix/advertise-video/w70l4s2wohpgb0hjrc1z",
      type: "video/webm",
    }
  ],
};

export type Source = (typeof videoData.advertiseVideo)[0];

// home services Data

export const servicePageOverviewAndService = [
  {
    id: 1,
    title: "Overview",
    slug: "overview",
    short_description:
      "Wafipix believes in helping businesses define what their brand stands for, their core values and tone of voice. We communicate those terms consistently across all media outlets.",
  },
  {
    id: 1,
    title: "Services",
    slug: "service",
    short_description:
      "You bring the steak, we’ll add the sizzle. We are a brand strategy agency, specializing in creating effective campaigns through identity design, brand story, messaging, and web development.",
  },
];

// Contact data
export const contactData = {
  address: {
    country: "Bangladesh",
    city: "Chittagong",
    area: "Colonel Hat",
    phone: "+8801632243382",
    email: "wafipix1@gmail.com",
  },
};

/**
 * Text data
 */

// nav links data
export const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Portfolios",
    href: "/portfolios",
  },
  {
    title: "Reviews",
    href: "/reviews",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

// Follow links data
export const followLinks = [
  {
    title: "Facebokk",
    link: "https://www.facebook.com",
  },
  {
    title: "Dribbble",
    link: "https://www.dribbble.com",
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com",
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com",
  },
];

export const servicePageTexts = {
  sidebar: {
    firstTagLine: "If you need it then we can do it.",
    secondTagline: "From Design To Publish and more.",
  },
};
export const aboutPageTexts = {
  sidebar: {
    firstTagLine: "Our Mission Is Simple",
    secondTagline: "We Build Compelling Brands That Connect.",
  },
};
