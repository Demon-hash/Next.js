import type { NextApiRequest, NextApiResponse } from "next"
import {IProduct} from "../../../types/product";

type Data = {
    clothes: IProduct[]
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
                        clothes: []
                    })
                    break
                case "ru":
                    res.status(200).json({
                        clothes: []
                    })
                    break
                case "de":
                    res.status(200).json({
                        clothes: []
                    })
                    break
                default:
                    res.status(200).json({
                        clothes: [],
                    })
                    break
            }
            break
        default:
            break
    }
}