import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
// import Hello from '../hello'

test("Testing works!", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Your code/i)).toBeInTheDocument();
});
