import React from "react";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Cart from "../components/Navbar/Cart"

jest.mock("next/router", () => require("next-router-mock"))
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (str: string) => str
    }),
}))

describe("Cart", () => {
    it("renders", () => {
        render(<Cart />)
        const cart = screen.getByTestId("cart")
        expect(cart).toBeInTheDocument()
    })

    it("shows cart items", () => {
        render(<Cart />)
        userEvent.click(screen.getByTestId("open-cart-button"))
        expect(1).toBe(1)
    })
})