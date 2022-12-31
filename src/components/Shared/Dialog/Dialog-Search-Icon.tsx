import { styled } from "@mui/material/styles"
import { Search } from "@mui/icons-material"

const DialogSearchIcon = styled(Search)(({ theme }) => ({
    color: theme.palette?.appSearchBar?.dark,
}))

export default DialogSearchIcon
