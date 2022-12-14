import React from "react"
import {
    Dialog,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControl,
    Typography, DialogContentText, IconButton, Box, TextFieldProps,
} from "@mui/material"
import { styled } from "@mui/material/styles"

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import {useTranslation} from "next-i18next";

type Props = {
    open: boolean
    onClose: () => void
}

const Container = styled(Dialog)(() => ({theme}) => ({
}));

const Title = styled(DialogTitle)(({ theme }) => ({
    ...theme.typography.h3,
    textAlign: "center",
    background: theme.palette?.appNavBar?.main,
    color: theme.palette?.appNavBar?.light
}))

const Content = styled(DialogContent)(({ theme }) => ({
    background: theme.palette?.appNavBar?.main,
    color: theme.palette?.appNavBar?.contrastText,
}))

const Actions = styled(DialogActions)(({ theme }) => ({
    background: theme.palette?.appNavBar?.main,
    color: theme.palette?.appNavBar?.contrastText,
}))

const Text = styled(DialogContentText)(({ theme }) => ({
    color: theme.palette?.appNavBar?.contrastText,
    ...theme.typography.body1,
    textAlign: "center",
    margin: theme.spacing(0, 0, 5,0),
}))

const ClickableIcon = styled(IconButton)(({ theme }) => ({
    color: theme.palette?.appNavBar?.contrastText,
}))

const TextInput = styled(TextField)<TextFieldProps>(({ theme }) => ({
    ".MuiOutlinedInput-root": {
        background: 0,
        "& > fieldset": {
            outline: 0,
        },
        margin: theme.spacing(0, 0, 3,0),
        color: theme.palette?.appSearchBar?.light,
        outline: 0,
    },
}))

const Auth: React.FC<Props> = ({ open, onClose }) => {

    const {t} = useTranslation("auth");

    return (
        <Container open={open} onClose={onClose}>
            <Title>{t("title")}</Title>
            <Content>
                <Text>
                    {t("desc")}
                </Text>
                <FormControl fullWidth>
                    <TextInput
                        required
                        type="email"
                        focused
                        label={t("email")}
                        variant="outlined"
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextInput
                        required
                        type="password"
                        label={t("password")}
                        variant="outlined"
                        focused
                    />
                </FormControl>
                <Typography variant="body1" component="div" color="">
                    {t("forgot-password")}
                </Typography>
            </Content>
            <Actions>
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={onClose}
                >
                    {t("login")}
                </Button>
            </Actions>
            <Actions>
                <Button color="info">
                    {t("sign-up")}
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <ClickableIcon>
                    <FacebookIcon/>
                </ClickableIcon>
                <ClickableIcon>
                    <TwitterIcon/>
                </ClickableIcon>
                <ClickableIcon>
                    <GoogleIcon/>
                </ClickableIcon>
            </Actions>
        </Container>
    )
}

export default Auth
