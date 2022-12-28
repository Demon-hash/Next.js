import type { NextApiRequest, NextApiResponse } from "next"
import { IBrands } from "../../../types/brands"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBrands>,
) {
    switch (req.method) {
        case "GET":
            switch (req.query?.locale) {
                case "en":
                    res.status(200).json({
                        brands: ["Adidas", "Puma", "Reebok", "Nike"],
                    })
                    break
                case "ru":
                    res.status(200).json({
                        brands: ["Puma", "Adidas", "Nike", "Reebok"],
                    })
                    break
                case "de":
                    res.status(200).json({
                        brands: ["Nike", "Puma", "Adidas", "Reebok"],
                    })
                    break
                default:
                    res.status(200).json({
                        brands: [],
                    })
                    break
            }
            break
        default:
            break
    }
}
