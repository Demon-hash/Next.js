import { render, screen } from '@testing-library/react'
import Cart from "../components/Navbar/Cart";

jest.mock('next/router', () => require('next-router-mock'));

describe('Cart', () => {
    it('It renders the cart', () => {
        render(<Cart/>);

        const cart = screen.getByTestId('cart');
        expect(cart).toBeInTheDocument();
    })
})