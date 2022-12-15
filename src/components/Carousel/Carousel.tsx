import React from "react"
import { Skeleton } from "@mui/material"
import MuiCarousel from "react-material-ui-carousel"
import { CarouselProps } from "react-material-ui-carousel/dist/components/types"
import { CarouselItem } from "../index"
import { ICarouselItem } from "../../types/carousel-item"

type Props = CarouselProps & {
    items: ICarouselItem[]
    height: number
}

const Carousel: React.FC<Props> = ({ items, height, ...rest }) => {
    return (
        <>
            {items.length ? (
                <MuiCarousel {...rest}>
                    {items.map((item, i) => (
                        <CarouselItem key={i} img={item.img} height={height} />
                    ))}
                </MuiCarousel>
            ) : (
                <Skeleton variant="rounded" height={height} />
            )}
        </>
    )
}

export default Carousel
