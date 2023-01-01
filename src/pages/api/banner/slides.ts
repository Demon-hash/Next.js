import type { NextApiRequest, NextApiResponse } from "next"
import { ICarouselItem } from "../../../types/carousel-item"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ICarouselItem[]>,
) {
    if (req.method !== "GET") return

    // "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",

    res.status(200).json([
        {
            img: "https://cdn.shopify.com/s/files/1/0441/3580/9179/files/image1.jpg?v=1657738696&width=1920",
        },
        {
            img: "https://cdn.shopify.com/s/files/1/0441/3580/9179/files/image1.jpg?v=1657738696&width=1920",
        },
        {
            img: "https://cdn.shopify.com/s/files/1/0441/3580/9179/files/image1.jpg?v=1657738696&width=1920",
        },
        {
            img: "https://cdn.shopify.com/s/files/1/0441/3580/9179/files/image1.jpg?v=1657738696&width=1920",
        },
        {
            img: "https://cdn.shopify.com/s/files/1/0441/3580/9179/files/image1.jpg?v=1657738696&width=1920",
        },
    ])
}
