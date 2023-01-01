import React, { useCallback, useMemo } from "react"
import { ICategoriesTable } from "../../types/categories"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useRouter } from "next/router"
import getTableData, { CategoryFactory } from "../../utils/Category"

type Props = {
    data: ICategoriesTable | undefined
}

const MobileCategory: React.FC<Props> = ({ data }) => {
    const { locale } = useRouter()

    const createAccordion = useCallback<CategoryFactory>(
        (entity, { getTitle }) => {
            if (typeof entity === "undefined") return <></>
            return (
                <Accordion key={entity.id}>
                    <AccordionSummary
                        expandIcon={
                            entity?.children?.length ? <ExpandMoreIcon /> : null
                        }
                    >
                        <Typography>{getTitle(entity, locale)}</Typography>
                    </AccordionSummary>
                </Accordion>
            )
        },
        [locale],
    )

    const { title, columns } = useMemo(
        () => getTableData(data, locale, createAccordion),
        [data, locale, createAccordion],
    )

    return data ? (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {columns.map((column, i) => (
                    <React.Fragment key={i}>
                        {column.map((row, i) => (
                            <React.Fragment key={i}>
                                <>{row}</>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            </AccordionDetails>
        </Accordion>
    ) : (
        <></>
    )
}

export default MobileCategory
