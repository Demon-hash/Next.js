import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    categories: string[]
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    switch (req.method) {
        case "POST":
            break
        case "GET":
            res.status(200).json({
                categories: [],
            })
            break
        case "PATCH":
            break
        case "PUT":
            break
        case "DELETE":
            break
        default:
            break
    }
}
