import { fetchOrderById, allIds, usersIds } from "../api";
import {
  fetchAllOrders,
  bucketOrdersByUsers,
  getLast2WeeksOrders,
  bucketOrdersByDate,
} from "./ecommerce";

const ORDER_ID = "70ef599e5eca171b2bce84d1";
test("Ecommerce - fetchOrderById", async () => {
  let order = await fetchOrderById(ORDER_ID);
  expect(order).toBeTruthy();
  expect(order.id).toEqual(ORDER_ID);
});

test("fethAllOrders fetches all orders", async () => {
  const allOrders = await fetchAllOrders();
  expect(allOrders).toBeTruthy();
  expect(allOrders.length).toBe(allIds.length);
});

test("if bucketOrdersByUsers fetches all users", async () => {
  const ordersByUsers = await bucketOrdersByUsers();
  expect(Object.keys(ordersByUsers).sort()).toEqual(usersIds.sort());
});

test("if bucketOrdersByUsers fetches all orders", async () => {
  const ordersByUsers = await bucketOrdersByUsers();
  const allOrders = await fetchAllOrders();
  expect([].concat.apply([], Object.values(ordersByUsers)).length).toBe(
    allOrders.length
  );
});

test("if getLast2WeeksOrders fetches only last two weeks data", async () => {
  const last2WeekOrders = await getLast2WeeksOrders();
  const timestamps = last2WeekOrders.map((item) => item.timestamp);
  const twoWeeksAgo = new Date().getTime() - 14 * 24 * 60 * 60 * 100;
  const result = timestamps.every((item) => {
    return item - twoWeeksAgo;
  });
  expect(result).toBeTruthy();
});
