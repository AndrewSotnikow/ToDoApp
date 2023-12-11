export const sleep = async (sec: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, sec * 1000);
  });
};
