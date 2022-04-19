////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";
import { convertTimeToDays, getOrdersKey } from "./helpers";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

export const fetchAllOrders = () => {
  const ids = allIds;
  //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.

  const promises = [];
  for (let id of ids) {
    promises.push(fetchOrderById(id));
  }

  return Promise.all(promises);
};

export const bucketOrdersByUsers = async () => {
  //   2. TODO: using the function from section 1 you should now bucket the orders by user.
  // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.

  let ordersByUsers = {};
  await fetchAllOrders().then((res) => {
    res.forEach((item) => {
      if (ordersByUsers[item.userId]) {
        ordersByUsers[item.userId] = [
          ...ordersByUsers[item.userId],
          item.title,
        ];
      } else {
        ordersByUsers[item.userId] = [item.title];
      }
    });
  });

  return ordersByUsers;
};

export const getLast2WeeksOrders = async () => {
  //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
  let last2WeekOrders = [];
  const now = new Date().getTime();

  await fetchAllOrders().then((res) => {
    res.forEach((item) => {
      if (convertTimeToDays(now - item.timestamp) <= 14) {
        last2WeekOrders.push(item);
      }
    });
  });

  return last2WeekOrders;

  //As third party libraries are no allowed, I used vanilla javascript to calculate date operations,
  // otherwise I would use moment.js or other third party library.
};

export const bucketOrdersByDate = async () => {
  //   4. TODO: using the function from section 3 bucket the orders by date.
  // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
  let ordersByDate = {};

  await getLast2WeeksOrders().then((res) => {
    res.forEach((item) => {
      const key = getOrdersKey(item.timestamp);
      if (ordersByDate[key]) {
        ordersByDate[key] = [...ordersByDate[key], item.title];
      } else {
        ordersByDate[key] = [item.title];
      }
    });
  });

  return ordersByDate;
};

fetchAllOrders();
//.then(console.log);

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
