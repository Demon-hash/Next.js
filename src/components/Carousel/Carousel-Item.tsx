import React from "react"
import Image from "next/image"
import { Paper } from "@mui/material"
import { ICarouselItem } from "../../types/carousel-item"

type Type = ICarouselItem & {
    width: number
    height: number
}

const CarouselItem: React.FC<Type> = ({ img, width, height }) => {
    return (
        <Paper elevation={0} sx={{ maxHeight: height, overflow: "hidden" }}>
            <Image
                src={img}
                alt="*"
                width={width}
                height={768}
                style={{ objectFit: "cover" }}
                loading="lazy"
            />
        </Paper>
    )
}

export default CarouselItem
