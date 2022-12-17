import { createTheme } from "@mui/material/styles"

const AppTheme = createTheme({
    palette: {
        primary: {
            main: "#0070ff",
            light: "#dadada",
            dark: "#3d3d3d",
        },
        warning: {
            main: "#ff3333",
        },
        appNavBar: {
            main: "#ffffff",
            light: "#fff",
            dark: "#dadada",
            contrastText: "#000000",
        },
        appSearchBar: {
            main: "#888888",
            dark: "#7a7a7a",
            light: "#fff",
            contrastText: "#000000",
        },
    },
})

export default AppTheme
