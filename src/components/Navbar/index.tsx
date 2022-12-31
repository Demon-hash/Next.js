import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
    AppBar,
    AppBarProps,
    Box,
    Button,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material"
import { SearchBar, Cart } from "../index"
import Auth from "./Auth"
import { styled } from "@mui/material/styles"
import { useTranslation } from "next-i18next"
import AppConfig from "../../../app.config"
import { useWindowSize } from "@react-hook/window-size"

import MenuIcon from "@mui/icons-material/Menu"

import MobileMenu from "./Mobile-Menu"

const MyAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
    background: theme.palette.appNavBar.main,
    color: theme.palette.appNavBar.contrastText,
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    padding: 0,
    margin: 0,
}))

const Navbar: React.FC = () => {
    const Company = AppConfig.appName
    const { t } = useTranslation("navbar")

    const theme = useTheme()
    const [width] = useWindowSize()

    const [authOpened, setAuthOpened] = useState<boolean>(false)
    const openAuthDialog = useCallback(() => setAuthOpened(true), [])
    const closeAuthDialog = useCallback(() => setAuthOpened(false), [])

    const [mobileMenuOpened, setMobileMenuOpened] = useState(false)

    const changeMobileMenuFlag = useCallback(
        (flag: boolean) => setMobileMenuOpened(flag),
        [],
    )

    // Hydration error fix
    const mobileHtml = useMemo(
        () => (
            <>
                <IconButton
                    size="large"
                    onClick={() => changeMobileMenuFlag(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="bottom" open={mobileMenuOpened}>
                    <MobileMenu onClose={() => changeMobileMenuFlag(false)} />
                </Drawer>
            </>
        ),
        [mobileMenuOpened, changeMobileMenuFlag],
    )

    const desktopHtml = useMemo(
        () => (
            <>
                <SearchBar />
                <Box sx={{ flexGrow: 1 }} />
                <Cart />
                <Button variant="outlined" onClick={openAuthDialog}>
                    {t("login")}
                </Button>
                <Auth open={authOpened} onClose={closeAuthDialog} />
            </>
        ),
        [authOpened, t, openAuthDialog, closeAuthDialog],
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
