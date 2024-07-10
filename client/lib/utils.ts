import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// check object same or not
export const isObjectSame = ({
  obj1,
  obj2,
}: {
  obj1: { [key: string]: string | boolean };
  obj2: { [key: string]: string | boolean };
}) => {
  const obj1keys = Object.keys(obj1);
  const obj2keys = Object.keys(obj2);

  if (obj1keys.length !== obj2keys.length) return false;

  for (let key of obj1keys) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
};

// check is Email or not

export const isEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

export const getSlugFromString = (str: string) =>
  str.toLowerCase().split(" ").join("-");

export const getStringFromSlug = (str: string) =>
  str.toLowerCase().split("-").join(" ");

// get short paragraph
export const getShortParagraph = ({
  str,
  maxLength,
  suffix,
}: {
  str: string;
  maxLength: number;
  suffix?: string;
}) => {
  let finalStr = "";
  if (str) {
    if (str?.length > maxLength) {
      finalStr = str?.slice(0, maxLength) + suffix;
    } else {
      finalStr = str;
    }
  }

  return finalStr;
};

// get username fallback character
export const getUsernameFallbackCharacter = (name: string) => {
  if (!name) return "";
  const splitName = name.split(" ");
  const firstChar = splitName[0].charAt(0);
  const lastChar =
    splitName.length > 1 ? splitName[splitName.length - 1].charAt(0) : "";
  return firstChar + lastChar;
};
