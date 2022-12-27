import type { NextApiRequest, NextApiResponse } from "next"

interface ICategory {
    id?: string
    title: string
    parent?: string
    children?: ICategory[]

    popular?: {
        id: string[]
        img: string[]
    }
}

const createCategory = ({
    id,
    title,
    parent,
    children,
}: ICategory): ICategory => {
    const randomId = () =>
        `${Math.floor(Math.random() * new Date().getMilliseconds())}`

    if (children?.length) {
        children = children.map(child => ({
            ...child,
            id: randomId(),
            parent: parent == null ? id : parent,
        }))
    }

    return {
        id: randomId(),
        title,
        parent,
        children,
    }
}

const women = createCategory({
    title: "women",
    children: [
        createCategory({
            title: "Sportswear",
            children: [],
        }),
        createCategory({
            title: "Swim & Beachwear",
            children: [
                createCategory({
                    title: "Bikinis",
                }),
                createCategory({
                    title: "Swimsuits",
                }),
            ],
        }),
    ],
})

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ICategory>,
) {
    const { query, method } = req
    if (method !== "GET") return

    switch (query?.locale) {
        case "ru":
            res.status(200).json(women)
            break
        case "de":
            res.status(200).json(women)
            break
        case "en":
            res.status(200).json(women)
            break
        default:
            res.status(200).json(women)
            break
    }
}
