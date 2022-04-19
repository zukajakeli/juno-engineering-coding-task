export const convertTimeToDays = (timestamp) => {
  return timestamp / (24 * 60 * 60 * 100);
};

export const getOrdersKey = (timestamp) => {
  return new Date(timestamp).toDateString();
};
