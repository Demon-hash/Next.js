import React from "react"
import { Skeleton } from "@mui/material"
import MuiCarousel from "react-material-ui-carousel"
import { CarouselProps } from "react-material-ui-carousel/dist/components/types"
import { CarouselItem } from "../index"
import { ICarouselItem } from "../../types/carousel-item"
import { useWindowSize } from "@react-hook/window-size"

type Props = CarouselProps & {
    items: ICarouselItem[]
    height: number
}

const Carousel: React.FC<Props> = ({ items, height, ...rest }) => {
    const [width] = useWindowSize()
    return (
        <>
            {items.length ? (
                <MuiCarousel {...rest}>
                    {items.map((item, i) => (
                        <CarouselItem
                            key={i}
                            img={item.img}
                            width={width}
                            height={height}
                        />
                    ))}
                </MuiCarousel>
            ) : (
                <Skeleton variant="rounded" height={height} />
            )}
        </>
    )
}

export default Carousel
