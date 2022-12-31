import React, { forwardRef } from "react"
import { TransitionProps } from "@mui/material/transitions"
import { Slide } from "@mui/material"

const DialogTransition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>,
) {
    {/* prettier-ignore */}
    return <Slide direction="up" ref={ref} {...props} />
})

export default DialogTransition
