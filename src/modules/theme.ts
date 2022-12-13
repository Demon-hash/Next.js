import { Palette, PaletteOptions } from "@mui/material"

declare module "@mui/material/styles" {
    interface Palette {
        appNavBar: Palette["primary"]
        appSearchBar: Palette["primary"]
    }

    interface PaletteOptions {
        appNavBar: PaletteOptions["primary"]
        appSearchBar: PaletteOptions["primary"]
    }
}

export {}
