import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material"
import { Cart, SearchBar } from "../index"
import Auth from "./Auth"
import { styled } from "@mui/material/styles"
import AppConfig from "../../../app.config"
import { useWindowSize } from "@react-hook/window-size"
import PersonIcon from "@mui/icons-material/Person"
import MobileMenu from "./Mobile-Menu"

const MyAppBar = styled(AppBar)(({ theme }) => ({
    background: theme.palette.appNavBar.main,
    color: theme.palette.appNavBar.contrastText,
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    padding: 0,
    margin: 0,
}))

const Navbar: React.FC = () => {
    const Company = AppConfig.appName

    const theme = useTheme()
    const [width] = useWindowSize()

    const [authOpened, setAuthOpened] = useState<boolean>(false)
    const openAuthDialog = useCallback(() => setAuthOpened(true), [])
    const closeAuthDialog = useCallback(() => setAuthOpened(false), [])

    // Hydration error fix
    const mobileHtml = useMemo(() => <MobileMenu />, [])

    const desktopHtml = useMemo(
        () => (
            <>
                <SearchBar />
                <Box sx={{ flexGrow: 1 }} />
                <IconButton size="large" onClick={openAuthDialog}>
                    <PersonIcon />
                </IconButton>
                <Cart />
                <Auth open={authOpened} onClose={closeAuthDialog} />
            </>
        ),
        [authOpened, openAuthDialog, closeAuthDialog],
    )

    const [content, setContent] = useState(desktopHtml)
    useEffect(
        () =>
            width >= theme.breakpoints.values.md
                ? setContent(desktopHtml)
                : setContent(mobileHtml),
        [theme.breakpoints.values.md, desktopHtml, mobileHtml, width],
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MyAppBar position="relative" elevation={0} id="navbar">
                <Toolbar id="navbar-toolbar">
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {Company}
                    </Typography>
                    {content}
                </Toolbar>
            </MyAppBar>
        </Box>
    )
}

export default Navbar
