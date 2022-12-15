import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    brands: string[]
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    switch (req.method) {
        case "GET":
            switch (req.query?.country) {
                case "en":
                    res.status(200).json({
                        brands: ["Adidas", "Puma", "Reebok", "Nike"],
                    })
                    break
                case "ru":
                    res.status(200).json({
                        brands: ["Adidas", "Puma", "Reebok", "Nike"],
                    })
                    break
                case "de":
                    res.status(200).json({
                        brands: ["Adidas", "Puma", "Reebok", "Nike"],
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
