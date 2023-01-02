import React, { useCallback, useMemo } from "react"
import { ICategoriesTable } from "../../types/categories"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material"
import { useRouter } from "next/router"
import getTableData, { CategoryFactory } from "../../utils/Category"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import Link from "next/link"
import { StaticRoutes } from "../../static-routes"

type Props = {
    data: ICategoriesTable | undefined
}

type Data = {
    title: string
    href: string
}

const MobileCategory: React.FC<Props> = ({ data }) => {
    const { locale, push: redirect } = useRouter()

    const createData = useCallback<CategoryFactory>(
        (entity, { getTitle }) => {
            if (typeof entity === "undefined") return null
            return {
                title: getTitle(entity, locale),
                href: StaticRoutes.Category.template + "/" + entity.id,
            }
        },
        [locale],
    )

    const { title, headers, columns } = useMemo(
        () => getTableData(data, locale, createData),
        [data, locale, createData],
    )

    const html = useMemo(() => {
        const b = new Array(headers.length).fill([])
        columns.forEach(column =>
            column.forEach(
                (row, index) =>
                    (b[index] = [...b[index], row].filter(v => v != null)),
            ),
        )

        return (headers as Data[]).map((header, index) => (
            <Accordion
                elevation={0}
                key={index}
                onClick={event => {
                    if (!b[index].length) {
                        event.stopPropagation()
                        void redirect(header.href)
                    }
                }}
            >
                <AccordionSummary
                    expandIcon={
                        b[index].length ? (
                            <ExpandMoreIcon />
                        ) : (
                            <NavigateNextIcon />
                        )
                    }
                    sx={{ pointerEvents: b[index].length ? "auto" : "none" }}
                >
                    <Typography>{header.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {(b[index] as Data[]).map((element, i) => (
                            <Link href={element.href} key={i}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end">
                                            <NavigateNextIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText primary={element.title} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        ))
    }, [headers, columns])

    return data ? (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>{html}</AccordionDetails>
        </Accordion>
    ) : (
        <></>
    )
}

export default MobileCategory
