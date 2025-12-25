export const generateQuery = (urlSearchParams) => {
  const asObj = Object.fromEntries(urlSearchParams.entries());
  const asString = urlSearchParams.toString();

  return {
    asObj,
    asString,
  };
}
