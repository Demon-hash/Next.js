import React, { useCallback, useState } from "react"
import { Box, Dialog, IconButton, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { DialogAppBar, DialogSearchIcon, DialogTransition } from "../Shared"
import CloseIcon from "@mui/icons-material/Close"
import PersonIcon from "@mui/icons-material/Person"
import { Cart } from "../index"
import Auth from "./Auth"
import MobileCategory from "../Category/Mobile"
import { getMenCategoriesTable, getWomenCategoriesTable } from "../../routes"
import { ICategoriesTable } from "../../types/categories"

const MobileMenu = () => {
    const [authOpened, setAuthOpened] = useState<boolean>(false)
    const openAuthDialog = useCallback(() => setAuthOpened(true), [])
    const closeAuthDialog = useCallback(() => setAuthOpened(false), [])

    const [mobileMenuOpened, setMobileMenuOpened] = useState(false)

    const changeMobileMenuFlag = useCallback(
        (flag: boolean) => setMobileMenuOpened(flag),
        [],
    )

    const { data: women } = getWomenCategoriesTable<ICategoriesTable>({})
    const { data: men } = getMenCategoriesTable<ICategoriesTable>({})

    return (
        <>
            <IconButton size="large" onClick={() => changeMobileMenuFlag(true)}>
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
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton size="large" onClick={openAuthDialog}>
                            <DialogSearchIcon />
                        </IconButton>
                        <IconButton size="large" onClick={openAuthDialog}>
                            <PersonIcon />
                        </IconButton>
                        <Cart />
                        <Auth
                            open={authOpened}
                            onClose={closeAuthDialog}
                            fullScreen={true}
                        />
                    </Toolbar>
                </DialogAppBar>
                <MobileCategory data={women} />
                <MobileCategory data={men} />
            </Dialog>
        </>
    )
}

export default MobileMenu
