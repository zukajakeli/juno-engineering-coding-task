import {render} from "@testing-library/react";
import App from "../task1/App";
import {fetchOrderById} from "../api";

test("Ecommerce - fetchOrderById", async() => {
    let orders = await fetchOrderById("70ef599e5eca171b2bce84d1");
    console.log(orders);
    expect(orders).toBeTruthy();
});