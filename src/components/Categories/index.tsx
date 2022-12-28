import React, {ReactElement, useCallback, useMemo} from "react"
import { styled } from "@mui/material/styles"
import {
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"

const Navigation = styled(Stack)(({ theme }) => ({
    width: "90%",
    margin: "auto",
    [theme.breakpoints.up("md")]: {
        justifyContent: "flex-start",
    },
}))

const Cell = styled(TableCell)(() => ({
    border: 0,
}))

import { getWomenCategoriesTable } from "../../routes"
import {
    ICategoriesTable,
    ICategoryTitleWithLanguages,
} from "../../types/categories"
import { useRouter } from "next/router"
import AppConfig from "../../../app.config"
import Link from "next/link"
import { StaticRoutes } from "../../static-routes"

const Categories: React.FC = () => {
    const { locale } = useRouter()

    const { data } = getWomenCategoriesTable<ICategoriesTable>({})

    const getTitleWithFallback = useCallback((entity: ICategoriesTable) => {
        if (!entity?.title) return "undefined"
        return (
            entity?.title?.[
                (typeof locale === "string"
                    ? locale
                    : AppConfig.defaultAppLanguage) as keyof ICategoryTitleWithLanguages
            ] ?? "undefined"
        )
    }, [locale]);

    const getTableHeight = useCallback((body: [ICategoriesTable[]]) =>
        Object.values(body).reduce(
            (p, c, i, a) => (a[p].length > c.length ? p : i),
            0,
        ), [])

    const createCellWithLink = useCallback((entity: ICategoriesTable | undefined) => {
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
    }, [getTitleWithFallback])

    const getTableHeaders = useCallback((table: ICategoriesTable | undefined) =>
        table?.children?.map(v => createCellWithLink(v)) ?? [], [createCellWithLink])

    const unpack = useCallback((
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
    }, []);

    const createTableCells = useCallback((
        headers: ReactElement[],
        table: [ICategoriesTable[]],
        height: number,
    ): ReactElement[] => {
        const cells = []
        for (let index = 0; index < table[height].length; index++) {
            for (let j = 0; j < headers.length; j++) {
                cells.push(createCellWithLink(table?.[j]?.[index]))
            }
        }
        return cells
    }, [createCellWithLink])

    const partition = useCallback((array: ReactElement[], n: number): ReactElement[][] => {
        return array.length
            ? [array.splice(0, n)].concat(partition(array, n))
            : []
    }, [])

    const createTableData = useCallback((table: ICategoriesTable) => {
        const headers = getTableHeaders(table)

        const body: [ICategoriesTable[]] =
            table?.children?.reduce(
                (acc, _, inx, arr) => ({
                    ...acc,
                    [inx]: unpack(arr[inx]?.children),
                }),
                {} as [ICategoriesTable[]],
            ) ?? ({} as [ICategoriesTable[]])

        const columns = partition(
            createTableCells(headers, body, getTableHeight(body)),
            headers.length,
        )

        return { headers, columns }
    }, [createTableCells, getTableHeaders, getTableHeight, partition, unpack]);

    const [title, headers, columns] = useMemo(() => {
        if (data == undefined) return [null, [], []]

        const title = getTitleWithFallback(data)
        const { headers, columns } = createTableData(data)

        return [title, headers, columns]
    }, [data, createTableData, getTitleWithFallback])

    return (
        <Navigation direction="row" alignItems="center" spacing={3}>
            {title}
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
                            {columns.map((column, i) => (
                                <TableRow key={i}>
                                    {column.map((row, i) => (
                                        <React.Fragment key={i}>
                                            <>{row}</>
                                        </React.Fragment>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Navigation>
    )
}

export default Categories
