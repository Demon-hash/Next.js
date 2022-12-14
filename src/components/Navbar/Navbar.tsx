import React, { useState } from "react"
import {
    AppBar,
    AppBarProps,
    Box,
    Button,
    Toolbar,
    Typography,
} from "@mui/material"
import { SearchBar, LanguageSwitcher, Cart } from "../index"
import Auth from "../Auth"
import { styled } from "@mui/material/styles"
import { useTranslation } from "next-i18next"

const MyAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
    background: theme.palette.appNavBar.main,
    color: theme.palette.appNavBar.contrastText,
}))

type Props = {}

const Navbar: React.FC<Props> = () => {
    const { t } = useTranslation(["navbar"])

    const [authOpened, setAuthOpened] = useState<boolean>(false)

    const openAuthDialog = () => setAuthOpened(true)
    const closeAuthDialog = () => setAuthOpened(false)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MyAppBar position="relative">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {t("title")}
                    </Typography>
                    <SearchBar />
                    <LanguageSwitcher />
                    <Box sx={{ flexGrow: 1 }} />
                    <Cart />
                    <Button color="inherit" onClick={openAuthDialog}>
                        {t("login")}
                    </Button>
                    <Auth open={authOpened} onClose={closeAuthDialog} />
                </Toolbar>
            </MyAppBar>
        </Box>
    )
}

export default Navbar
