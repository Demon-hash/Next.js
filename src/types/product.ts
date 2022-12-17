import { StaticImageData } from "next/dist/client/image"

export interface IProduct {
    id: string
    name: string
    price: number
    img: string | StaticImageData
    brand?: string
    colors?: string[]
    rating?: number
    discount?: number
}
