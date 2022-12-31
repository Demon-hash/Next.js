import React, { useCallback, useState } from "react"
import { Box, Dialog, IconButton, Toolbar } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import PersonIcon from "@mui/icons-material/Person"
import Auth from "./Auth"
import Cart from "./Cart"
import { DialogAppBar, DialogSearchIcon, DialogTransition } from "../Shared"

type Props = {
    onClose: () => void
}

const MobileMenu: React.FC<Props> = ({ onClose }) => {
    const [authOpened, setAuthOpened] = useState<boolean>(false)
    const openAuthDialog = useCallback(() => setAuthOpened(true), [])
    const closeAuthDialog = useCallback(() => setAuthOpened(false), [])

    return (
        <Box
            sx={{
                width: "100vw",
            }}
        >
            <Dialog
                fullScreen
                open={true}
                onClose={onClose}
                TransitionComponent={DialogTransition}
            >
                <DialogAppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={onClose}
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
        </Box>
    )
}

export default MobileMenu
