import {StaticImageData} from "next/dist/client/image";

export interface IProduct {
    id: number;
    name: string;
    price: string;
    img: string | StaticImageData;
}