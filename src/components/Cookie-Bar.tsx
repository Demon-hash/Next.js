import React from "react"
import { styled } from "@mui/material/styles"
import { Paper } from "@mui/material"

const Item = styled(Paper)(({ theme }) => ({
    position: "fixed",
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#5d4949",
    color: theme.palette.text.secondary,
    bottom: 0,
    left: 0,
    zIndex: 1000,
}))

const CookieBar = () => {
    return <Item></Item>
}

export default CookieBar
