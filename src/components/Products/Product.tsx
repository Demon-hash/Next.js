import React from "react"
import { styled } from "@mui/material/styles"
import { Paper, Skeleton, Typography } from "@mui/material"
import Image from "next/image"
import AppConfig from "../../../app.config"

import styles from "../../styles/components/image.module.css"
import { IProduct } from "../../types/product"

type Props = IProduct & {
    gap: number
}

const Product: React.FC<Props> = ({ name, img, price, gap }) => {
    const width = `calc(25% - ${gap * 10}px)`

    const Item = styled(Paper)(({ theme }) => ({
        position: "relative",
        width: width,
        maxWidth: width,
        marginTop: `${gap * 20}px`,
        ...theme.typography.body2,
        padding: theme.spacing(3),
        textAlign: "left",
        color: theme.palette.text.secondary,
        border: `1px solid ${theme.palette.primary.light}`,
    }))

    return name.length && price.length ? (
        <Item>
            <div className={styles.imageContainer} role="img">
                <Image
                    src={img}
                    className={styles.image}
                    alt="*"
                    fill
                    loading="lazy"
                />
            </div>
            <Typography variant="body1" component="p">
                {name}
            </Typography>
            <Typography
                variant="body1"
                component="p"
                sx={{ fontWeight: "bold" }}
            >
                {AppConfig.currency}
                {price}
            </Typography>
        </Item>
    ) : (
        <Skeleton variant="rounded" width={width} height={300} />
    )
}

export default Product
