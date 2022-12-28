import React, {ReactElement, useEffect, useMemo, useState} from "react"
import {styled} from "@mui/material/styles"
import {
    Box,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Image from "next/image"

const Navigation = styled(Stack)(({theme}) => ({
    width: "90%",
    margin: "auto",
    [theme.breakpoints.up("md")]: {
        justifyContent: "flex-start",
    },
}))

const Cell = styled(TableCell)(() => ({
    border: 0,
}))

import img from "../../../public/assets/img/1.jpg"
import {getWomenCategoriesTable} from "../../routes"
import {
    ICategoriesTable,
    ICategoryTitleWithLanguages,
} from "../../types/categories"
import {useRouter} from "next/router"
import AppConfig from "../../../app.config"
import Link from "next/link"
import {StaticRoutes} from "../../static-routes"

const Categories: React.FC = () => {
    const {locale} = useRouter()

    const {data} = getWomenCategoriesTable<ICategoriesTable>({})

    const getTitleWithFallback = (entity: ICategoriesTable) => {
        if (!entity?.title) return "undefined"
        return (
            entity?.title?.[
                (typeof locale === "string"
                    ? locale
                    : AppConfig.defaultAppLanguage) as keyof ICategoryTitleWithLanguages
                ] ?? "undefined"
        )
    }

    const getTableHeaders = (table: ICategoriesTable | undefined) =>
        table?.children?.map(v => createCellWithLink(v)) ?? []

    const createCellWithLink = (entity: ICategoriesTable | undefined) => {
        if (typeof entity === "undefined") return <Cell></Cell>
        return (
            <Cell key={entity.id}>
                <Link
                    href={`${StaticRoutes.Category.template + "/" + entity.id}`}
                >
                    {getTitleWithFallback(entity)}
                </Link>
            </Cell>
        )
    }

    const unpack = (
        table: ICategoriesTable | ICategoriesTable[] | undefined,
    ): ICategoriesTable[] => {
        if (table == undefined) return []
        const res: ICategoriesTable[] = []

        if (Array.isArray(table)) {
            table.forEach(v => {
                res.push(v, ...unpack(v.children))
            })
        } else {
            return [table]
        }

        return res
    }

    const partition = (array: ReactElement[], n: number): ReactElement[][] => {
        return array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];
    }

    const createTableData = (table: ICategoriesTable) => {
        const headers = getTableHeaders(table)
        const body =
            table?.children?.reduce(
                (acc, _, inx, arr) => ({
                    ...acc,
                    [inx]: unpack(arr[inx]?.children),
                }),
                {},
            ) ?? {}

        const cells = []
        // const index = 0;

        for (let index = 0; index < 3; index++) {
            for (let j = 0; j < headers.length; j++) {
                if (j === 0) {
                    cells.push(body?.[j]?.[index] ? createCellWithLink(body[j][index]) : <Cell></Cell>)
                } else {
                    cells.push(body?.[j]?.[index] ? createCellWithLink(body[j][index]) : <Cell></Cell>)
                }
            }
        }

        const columns = partition(cells, Math.floor(cells.length / headers.length))

        const content = (
            <>
                {columns.map((column, i) => (
                    <TableRow key={i}>
                        {
                            column.map((row, i) => (
                                <React.Fragment key={i}>
                                    <>{row}</>
                                </React.Fragment>
                            ))
                        }
                    </TableRow>
                ))}
            </>
        )

        return {
            headers,
            content
        }
    }

    const [title, headers, table] = useMemo(() => {
        if (data == undefined) return [null, [], []]

        const title = getTitleWithFallback(data);
        const {headers, content} = createTableData(data);

        return [title, headers, content]
    }, [data, locale])

    return (
        <Navigation direction="row" alignItems="center" spacing={3}>
            <Stack
                direction="row"
                justifyContent="center"
                justifyItems="center"
            >
                <TableContainer component={Paper} elevation={0}>
                    <Table
                        size="small"
                        sx={{
                            width: "100%",
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                {headers?.map((h, i) => (
                                    <React.Fragment key={i}>
                                        <>{h}</>
                                    </React.Fragment>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Navigation>
    )
}

export default Categories
