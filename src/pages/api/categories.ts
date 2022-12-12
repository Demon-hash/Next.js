// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
    categories: string[]
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if(req.method !== "GET") return;
    res.status(200).json({
        categories: [
            "All",
            "Arts & Crafts",
            "Automotive",
            "Baby",
            "Beauty & Personal Care",
            "Books",
            "Boys' Fashion",
            "Computers",
            "Deals",
            "Digital Music",
            "Electronics",
            "Girls' Fashion",
            "Health & Household",
            "Home & Kitchen",
            "Industrial & Scientific",
            "Kindle Store",
            "Luggage",
            "Men's Fashion",
            "Movies & TV",
            "Music, CDs & Vinyl",
            "Pet Supplies",
            "Prime Video",
            "Software",
            "Sports & Outdoors",
            "Tools & Home Improvement",
            "Toys & Games",
            "Video Games",
            "Women's Fashion"
        ]
    });
}
