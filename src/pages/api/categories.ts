import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    categories: string[]
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const { query, method } = req
    if (method !== "GET") return

    switch (query?.locale) {
        case "ru":
            res.status(200).json({
                categories: [
                    "Везде",
                    "Искусство и Ремесло",
                    "Автомобильный",
                    "Малыш",
                    "Красота и уход за собой",
                    "Книги",
                    "Мода для мальчиков",
                    "Компьютеры",
                    "Предложения",
                    "Цифровая музыка",
                    "Электроника",
                    "Мода для девочек",
                    "Здоровье и домашнее хозяйство",
                    "Дом и кухня",
                    "Промышленные и научные",
                    "Разжечь Магазин",
                    "Багаж",
                    "Мужская мода",
                    "Фильмы и ТВ",
                    "Музыка, компакт-диски и винил",
                    "Зоотовары",
                    "Прайм Видео",
                    "Программного обеспечения",
                    "Спорт и активный отдых",
                    "Инструменты и товары для дома",
                    "Игрушки и игры",
                    "Видеоигры",
                    "Женская мода",
                ],
            })
            break
        case "de":
            res.status(200).json({
                categories: [
                    "Alle",
                    "Kunst und Skulpturen",
                    "Automobil",
                    "Baby",
                    "Schönheit & Körperpflege",
                    "Bücher",
                    "Jungenmode",
                    "Computers",
                    "Angebote",
                    "Digitale Musik",
                    "Elektronik",
                    "Mädchenmode",
                    "Gesundheit & Haushalt",
                    "Haus & Küche",
                    "Industrie & Wissenschaft",
                    "Kindle Store",
                    "Gepäck",
                    "Männermode",
                    "Filme & Fernsehen",
                    "Musik, CDs & Vinyl",
                    "Haustierzubehör",
                    "Prime Video",
                    "Software",
                    "Sport & Freizeit",
                    "Werkzeuge & Heimwerker",
                    "Spielzeug & Spiele",
                    "Videospiele",
                    "Frauenmode",
                ],
            })
            break
        case "en":
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
                    "Women's Fashion",
                ],
            })
            break
        default:
            res.status(200).json({
                categories: [],
            })
            break
    }
}
