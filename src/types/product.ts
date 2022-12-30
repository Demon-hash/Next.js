export interface IProduct {
    id: string
    name: string
    price: number
    img: string
    brand?: string
    colors?: string[]
    rating?: number
    discount?: number
}
