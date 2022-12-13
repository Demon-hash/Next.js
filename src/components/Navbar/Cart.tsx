import React, { forwardRef, useEffect, useState } from "react"
import { ShoppingCart } from "@mui/icons-material"
import {
    AppBar,
    AppBarProps,
    Badge,
    Button,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Slide,
    Toolbar,
    Typography,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import CloseIcon from "@mui/icons-material/Close"
import { styled } from "@mui/material/styles"
import { useTranslation } from "next-i18next"

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>,
) {
    {/* prettier-ignore */}
    return <Slide direction="up" ref={ref} {...props}/>
})

const ShoppingCartIcon = styled(ShoppingCart)(({ theme }) => ({
    color: theme.palette?.appNavBar?.contrastText,
}))

const MyAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
    background: theme.palette?.appNavBar?.main,
    color: theme.palette?.appNavBar?.contrastText,
}))

type Props = {}

const Cart: React.FC<Props> = () => {
    const { t } = useTranslation("cart")

    const [opened, setOpen] = useState<boolean>(false)

    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)

    useEffect(() => {
        if (!opened) return
        fetch("/api/cart", {
            method: "GET",
        })
            .then()
            .catch()
    }, [opened])

    return (
        <div>
            <IconButton onClick={onOpen}>
                <Badge badgeContent={4} color="warning">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>

            <Dialog
                fullScreen
                open={opened}
                onClose={onClose}
                TransitionComponent={Transition}
            >
                <MyAppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={onClose}
                            color="inherit"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            {t("title")}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={onClose}>
                            {t("checkout")}
                        </Button>
                    </Toolbar>
                </MyAppBar>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Phone ringtone"
                            secondary="Titania"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText
                            primary="Default notification ringtone"
                            secondary="Tethys"
                        />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    )
}

export default Cart
