export const Utils = {
  Sleep: async (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, ms);
    });
  },
};
