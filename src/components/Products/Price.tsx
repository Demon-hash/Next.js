import React from "react"
import AppConfig from "../../../app.config"
import { Stack, Typography, useTheme } from "@mui/material"

type Props = {
    price: number
    discount?: number
}

const Price: React.FC<Props> = ({ price, discount = 0 }) => {
    const theme = useTheme()
    const priceWithDiscount = Math.max(
        0,
        Math.floor(price * ((discount ?? 0) / 100)),
    )

    return (
        <>
            {discount ? (
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="end"
                    spacing={1}
                >
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            fontWeight: "bold",
                            color: theme.palette.primary.dark,
                        }}
                    >
                        {AppConfig.currency}
                        {priceWithDiscount}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="div"
                        sx={{
                            textDecoration: "line-through",
                        }}
                    >
                        {AppConfig.currency}
                        {price}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="div"
                        sx={{
                            color: theme.palette.primary.dark,
                        }}
                    >
                        ({discount}% off)
                    </Typography>
                </Stack>
            ) : (
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.dark,
                    }}
                >
                    {AppConfig.currency}
                    {price}
                </Typography>
            )}
        </>
    )
}

export default Price
