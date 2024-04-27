export const capitalizeAndSpace = (str) => {
  return str.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
};