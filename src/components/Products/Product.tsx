import React from "react"
import {styled} from "@mui/material/styles"
import {Paper, Skeleton, Stack, Typography, useTheme} from "@mui/material"
import Image from "next/image"

import styles from "../../styles/components/image.module.css"
import {IProduct} from "../../types/product"
import Colors from "./Colors"
import Price from "./Price"
import Link from "next/link";
import {StaticRoutes} from "../../static-routes";

type Props = IProduct & {
    gap: number
}

const Product: React.FC<Props> = ({
                                      id,
                                      name,
                                      img,
                                      price,
                                      gap,
                                      brand,
                                      colors,
                                      rating,
                                      discount,
                                  }) => {
    const width = `calc(25% - ${gap * 10}px)`
    const theme = useTheme()

    const Item = styled(Paper)(({theme}) => ({
        position: "relative",
        [theme.breakpoints.between("xs", "sm")]: {
            width: `calc(100% - ${gap * 10}px)`,
            maxWidth: `calc(100% - ${gap * 10}px)`,
        },
        [theme.breakpoints.between("sm", "lg")]: {
            width: `calc(50% - ${gap * 10}px)`,
            maxWidth: `calc(50% - ${gap * 10}px)`,
        },
        [theme.breakpoints.up("lg")]: {
            width: width,
            maxWidth: width,
        },
        marginTop: `${gap * 20}px`,
        ...theme.typography.body2,
        padding: theme.spacing(3),
        textAlign: "center",
        color: theme.palette.text.secondary,
        border: `1px solid ${theme.palette.primary.light}`,
    }))

    return name.length ? (
            <Item>
                <div className={styles.imageContainer} role="img">
                    <Link href={`${StaticRoutes.Product.template}/${id}`}>
                    <Image
                        src={img}
                        className={styles.image}
                        alt="*"
                        fill
                        loading="lazy"
                    />
                    </Link>
                </div>
                <Colors colors={colors}/>
                <Stack
                    spacing={0.5}
                    sx={{
                        margin: theme.spacing(2, "auto"),
                    }}
                >
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            fontWeight: "bold",
                            color: theme.palette.primary.dark,
                        }}
                    >
                        {brand}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{
                            color: theme.palette.primary.dark,
                        }}
                    >
                        {name}
                    </Typography>
                    <Price price={price} discount={discount}/>
                </Stack>
            </Item>
    ) : (
        <Skeleton variant="rounded" width={width} height={300}/>
    )
}

export default Product
