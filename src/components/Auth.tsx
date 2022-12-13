import React from "react"
import {
    Dialog,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControl,
    Typography,
} from "@mui/material"
import { styled } from "@mui/material/styles"

type Props = {
    open: boolean
    onClose: () => void
}

const Container = styled(Dialog)(() => ({}))

const Title = styled(DialogTitle)(({ theme }) => ({
    padding: theme.spacing(50, "auto"),
}))

const Content = styled(DialogContent)(() => ({
    textAlign: "left",
}))

const Auth: React.FC<Props> = ({ open, onClose }) => {
    return (
        <Container open={open} onClose={onClose}>
            <Title>Login</Title>
            <Content>
                <FormControl fullWidth>
                    <TextField required label="Username" variant="filled" />
                </FormControl>
                <FormControl fullWidth>
                    <TextField required label="Password" variant="filled" />
                </FormControl>
                <Typography variant="body1" component="div" color="">
                    Forgot password?
                </Typography>
            </Content>
            <DialogActions>
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={onClose}
                    autoFocus
                >
                    Login
                </Button>
            </DialogActions>
            <Typography variant="body1" component="div" color="">
                Not a member? Signup
            </Typography>
        </Container>
    )
}

export default Auth
