import { styled } from "@mui/material/styles"
import { AppBar } from "@mui/material"

const DialogAppBar = styled(AppBar)(({ theme }) => ({
    background: theme.palette?.appNavBar?.main,
    color: theme.palette?.appNavBar?.contrastText,
}))

export default DialogAppBar
