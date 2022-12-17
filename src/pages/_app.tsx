import React from "react"
import type { AppProps } from "next/app"
import { appWithTranslation } from "next-i18next"
import { ThemeProvider } from "@mui/material/styles"

import AppTheme from "../providers/theme"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "../styles/globals.css"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={AppTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default appWithTranslation(App)
