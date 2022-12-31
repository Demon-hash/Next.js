import { styled } from "@mui/material/styles"

type Props = {
    width?: number | string
    height?: number | string
}

const Image = styled("img")<Props>(({ width = "100%", height = "unset" }) => ({
    position: "relative",
    objectFit: "contain",
    width,
    height,
}))

export default Image
