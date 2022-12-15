import React from "react"
import { StaticImageData } from "next/dist/client/image"
import Image from "next/image"
import { Paper } from "@mui/material"

type Type = {
    img: string | StaticImageData
    height: number
}

const CarouselItem: React.FC<Type> = ({ img, height }) => {
    return (
        <Paper elevation={0} sx={{ maxHeight: height, overflow: "hidden" }}>
            <Image
                src={img}
                alt="*"
                style={{ objectFit: "contain" }}
                loading="lazy"
            />
        </Paper>
    )
}

export default CarouselItem
