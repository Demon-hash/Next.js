import React, {useState} from 'react';
import {ShoppingCart} from "@mui/icons-material";
import {
    AppBar,
    Badge,
    Button,
    Dialog, Divider,
    IconButton,
    List,
    ListItem,
    ListItemText, Slide,
    Toolbar,
    Typography
} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import CloseIcon from '@mui/icons-material/Close';
import {styled} from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ShoppingCartIcon = styled(ShoppingCart)(({ theme }) => ({
    color: theme.palette?.appNavBar?.contrastText
}));

type Props = {}

const Cart: React.FC<Props> = () => {

    const [opened, setOpen] = useState<boolean>(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <div>
            <IconButton onClick={onOpen}>
                <Badge badgeContent={4} color="warning">
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>

            <Dialog
                fullScreen
                open={opened}
                onClose={onClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={onClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania"/>
                    </ListItem>
                    <Divider/>
                    <ListItem button>
                        <ListItemText
                            primary="Default notification ringtone"
                            secondary="Tethys"
                        />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}

export default Cart;