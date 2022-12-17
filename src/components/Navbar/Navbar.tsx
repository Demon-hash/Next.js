import React, { useState } from "react"
import {
    AppBar,
    AppBarProps,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material"
import { SearchBar, LanguageSwitcher, Cart } from "../index"
import Auth from "../Auth"
import { styled } from "@mui/material/styles"
import { useTranslation } from "next-i18next"
import AppConfig from "../../../app.config"
import { useWindowSize } from "@react-hook/window-size"

import MenuIcon from "@mui/icons-material/Menu"

const MyAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
    background: theme.palette.appNavBar.main,
    color: theme.palette.appNavBar.contrastText,
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    padding: 0,
    margin: 0,
}))

type Props = {}

const Navbar: React.FC<Props> = () => {
    const Company = AppConfig.appName
    const { t } = useTranslation(["navbar"])

    const theme = useTheme()
    const [width, height] = useWindowSize()

    const [authOpened, setAuthOpened] = useState<boolean>(false)

    const openAuthDialog = () => setAuthOpened(true)
    const closeAuthDialog = () => setAuthOpened(false)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MyAppBar position="relative" elevation={0}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {Company}
                    </Typography>
                    <SearchBar />
                    {width >= theme.breakpoints.values.md ? (
                        <>
                            <LanguageSwitcher />
                            <Box sx={{ flexGrow: 1 }} />
                            <Cart />
                            <Button variant="outlined" onClick={openAuthDialog}>
                                {t("login")}
                            </Button>
                            <Auth open={authOpened} onClose={closeAuthDialog} />
                        </>
                    ) : (
                        <>
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton size="large">
                                <MenuIcon />
                            </IconButton>
                        </>
                    )}
                </Toolbar>
            </MyAppBar>
        </Box>
    )
}

export default Navbar
