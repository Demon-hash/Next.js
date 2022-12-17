import type { NextApiRequest, NextApiResponse } from "next"
import { IProduct } from "../../../types/product"

const Products: IProduct[] = [
    {
        id: "Qd5C8w-8bv7",
        name: "Men's Clothing Long Sleeve",
        price: 1400,
        img: "https://m.media-amazon.com/images/I/61vTYHGQJCL._UX679_.jpg",
        brand: "Nike",
        colors: [
            "#c3c3c3",
            "#f94040",
            "#61944a",
            "#3d85c6",
            "#eff244",
            "#9344f2",
            "#f24491",
            "#8bf244",
        ],
        rating: 4.5,
        discount: 67,
    },
    {
        id: "v4tQ8-Iy6",
        name: "Men's Clothing Long Sleeve",
        price: 2200,
        img: "https://m.media-amazon.com/images/I/61OLdwoWSoL._UX679_.jpg",
        brand: "Nike",
    },
    {
        id: "n9y1b-2d3",
        name: "Men's Clothing Long Sleeve",
        price: 2500,
        img: "https://m.media-amazon.com/images/I/61gfJCwpRxL._UX679_.jpg",
    },
    {
        id: "b1n6y8-x1uo",
        name: "Men's Clothing Long Sleeve",
        price: 2400,
        img: "https://m.media-amazon.com/images/I/61VYYe0BUOL._UX679_.jpg",
    },
    {
        id: "rub5ch-jok3p",
        name: "Men's Clothing Long Sleeve",
        price: 1100,
        img: "https://m.media-amazon.com/images/I/61XvhUk7uNL._UX679_.jpg",
        brand: "Puma",
    },
]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IProduct[]>,
) {
    switch (req.method) {
        case "GET":
            switch (req.query?.locale) {
                case "en":
                    res.status(200).json(Products)
                    break
                case "ru":
                    res.status(200).json([])
                    break
                case "de":
                    res.status(200).json([])
                    break
                default:
                    res.status(200).json([])
                    break
            }
            break
        default:
            break
    }
}
