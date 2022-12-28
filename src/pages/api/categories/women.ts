import type { NextApiRequest, NextApiResponse } from "next"
import {
    ICategoriesTable,
    ICategoryTitleWithLanguages,
} from "../../../types/categories"

const withLanguages = (
    en: string,
    ru: string,
    de: string,
): ICategoryTitleWithLanguages => ({ en, ru, de })

const createCategory = ({
    id,
    title,
    parent,
    children,
}: ICategoriesTable): ICategoriesTable => {
    const randomId = () =>
        [...Array(24)].map(() => Math.random().toString(36)[2]).join("")

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
    title: withLanguages("women", "женшине", "women"),
    children: [
        createCategory({
            title: withLanguages("Clothing", "Одежда", "Clothing"),
            children: [
                createCategory({
                    title: withLanguages(
                        "Swim & Beachwear",
                        "Купальники & Костюмы",
                        "Swim & Beachwear",
                    ),
                    children: [
                        createCategory({
                            title: withLanguages(
                                "Bikinis",
                                "Бикини",
                                "Bikinis",
                            ),
                        }),
                        createCategory({
                            title: withLanguages(
                                "Swimsuits",
                                "Косюмы",
                                "Swimsuits",
                            ),
                        }),
                    ],
                }),
            ],
        }),
        createCategory({
            title: withLanguages("Shoes", "Обувь", "Shoes"),
            children: [
                createCategory({
                    title: withLanguages("Boots", "Ботинки", "Boots"),
                    children: [],
                }),
            ],
        }),
        createCategory({
            title: withLanguages("Watches", "Часы", "Watches"),
            children: [],
        }),
        createCategory({
            title: withLanguages("Jewellery", "Украшения", "Jewellery"),
            children: [],
        }),
        createCategory({
            title: withLanguages("Glasses", "Очки", "Glasses"),
            children: [],
        }),
        createCategory({
            title: withLanguages("Handbags", "Сумки", "Handbags"),
            children: [],
        }),
    ],
})

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ICategoriesTable>,
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
