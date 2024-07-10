// get slug from string, if any . or ? or ! or , or any icon or space replace with -

export const getSlug = (string: string) => {
  return string
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export const bgWorker = (fn: () => Promise<any>, interval: number) => {
  try {
    setTimeout(async () => {
      await fn();
    }, interval);
  } catch (error) {
    console.log("background work error", error);
  }
};
