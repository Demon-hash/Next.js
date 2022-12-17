import React from "react"
import { Paper, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

type Props = {
    colors?: string[]
    count?: number
}

const Colors: React.FC<Props> = ({ colors, count = 5 }) => {
    const Color = styled(Paper)(() => ({
        borderRadius: "50%",
        width: 24,
        height: 24,
    }))
    return (
        <>
            {colors?.length && (
                <Stack
                    alignContent="center"
                    alignItems="center"
                    justifyContent="center"
                    direction="row"
                    spacing={1}
                >
                    {colors?.slice(0, count)?.map(color => (
                        <Color key={color} sx={{ background: color }} />
                    ))}
                    {colors?.length > count && (
                        <Typography variant="body2">
                            +{colors.length - count}
                        </Typography>
                    )}
                </Stack>
            )}
        </>
    )
}

export default Colors
