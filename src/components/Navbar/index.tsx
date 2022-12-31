import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
    AppBar,
    AppBarProps,
    Box,
    Button, Dialog,
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

import {DialogAppBar, DialogSearchIcon, DialogTransition} from "../Shared";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";

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
                <Dialog
                    fullScreen
                    open={mobileMenuOpened}
                    onClose={() => changeMobileMenuFlag(false)}
                    TransitionComponent={DialogTransition}
                >
                    <DialogAppBar sx={{ position: "relative" }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                onClick={() => changeMobileMenuFlag(false)}
                                color="inherit"
                            >
                                <CloseIcon />
                            </IconButton>
                            <IconButton size="large" onClick={openAuthDialog}>
                                <PersonIcon />
                            </IconButton>
                            <DialogSearchIcon />
                            <Cart />
                            <Auth open={authOpened} onClose={closeAuthDialog} fullScreen={true} />
                        </Toolbar>
                    </DialogAppBar>
                </Dialog>
            </>
        ),
        [mobileMenuOpened, changeMobileMenuFlag, openAuthDialog, closeAuthDialog, authOpened],
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
