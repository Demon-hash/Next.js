import { createTheme } from "@mui/material/styles"

const AppTheme = createTheme({
    palette: {
        primary: {
            main: "#0070ff",
        },
        appNavBar: {
            main: "#0F0F0F",
            light: "#888888",
            dark: "#1c1c1c",
            contrastText: "#888888",
        },
        appSearchBar: {
            main: "#888888",
            dark: "#fff",
            light: "#fff",
            contrastText: "#888888",
        },
    },
})

export default AppTheme