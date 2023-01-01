import React, { useCallback, useEffect } from "react"
import { ICategoriesTable } from "../../types/categories"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useRouter } from "next/router"

type Props = {
    data: ICategoriesTable | undefined
}

const MobileCategory: React.FC<Props> = ({ data }) => {
    const { locale } = useRouter()

    // const getCategoryTitle = useCallback(
    //     (entity: Parameters<typeof getTitleWithFallback>[0]) =>
    //         getTitleWithFallback(entity, locale),
    //     [locale],
    // )
    //
    // const unpackCategories = useCallback(
    //     (table: Parameters<typeof unpack>[0]) => unpack(table),
    //     [],
    // )

    // useEffect(() => {}, [])
    //
    // const createHeader = useCallback(
    //     (entity: ICategoriesTable | undefined) => {
    //         if (typeof entity === "undefined") return null
    //         return (
    //             <React.Fragment key={entity.id}>
    //                 {entity?.children?.length ? (
    //                     <Accordion>
    //                         <AccordionSummary
    //                             expandIcon={
    //                                 entity?.children?.length ? (
    //                                     <ExpandMoreIcon />
    //                                 ) : null
    //                             }
    //                         >
    //                             <Typography>
    //                                 {getCategoryTitle(entity)}
    //                             </Typography>
    //                         </AccordionSummary>
    //                         <AccordionDetails>
    //                             {unpackCategories(entity?.children).map(
    //                                 createHeader,
    //                             )}
    //                         </AccordionDetails>
    //                     </Accordion>
    //                 ) : (
    //                     <Accordion>
    //                         <AccordionSummary expandIcon={null}>
    //                             <Typography>
    //                                 {getCategoryTitle(entity)}
    //                             </Typography>
    //                         </AccordionSummary>
    //                     </Accordion>
    //                 )}
    //             </React.Fragment>
    //         )
    //     },
    //     [getCategoryTitle],
    // )
    //
    // const getHeaders = useCallback(
    //     (table: ICategoriesTable | undefined) =>
    //         table?.children?.map(v => createHeader(v)) ?? [],
    //     [createHeader],
    // )

    // return data ? (
    //     <Accordion>
    //         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    //             <Typography>{getCategoryTitle(data)}</Typography>
    //         </AccordionSummary>
    //         <AccordionDetails>{getHeaders(data)}</AccordionDetails>
    //     </Accordion>
    // ) : (
    //     <></>
    // )

    return <></>
}

export default MobileCategory
