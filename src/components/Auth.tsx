import React from "react";
import {Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

type Props = {
    open: boolean;
    onClose: () => void;
}

const Auth: React.FC<Props> = ({open, onClose}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Disagree</Button>
                <Button onClick={onClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Auth;