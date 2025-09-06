export const genericError = "Something went wrong. Please try again later.";

export const appErrorMessage = (
  devMessage: string,
  prodMessage: string = genericError,
): string => {
  const isDev = process.env.NODE_ENV === "development";

  return isDev ? devMessage : prodMessage;
};
