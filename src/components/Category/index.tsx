import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { styled } from "@mui/material/styles"
import {
    Paper,
    Stack,
    Table,
    TableBody,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from "@mui/material"
import {
    ICategoriesTable,
    ICategoryTitleWithLanguages,
} from "../../types/categories"
import AppConfig from "../../../app.config"
import { StaticRoutes } from "../../static-routes"
import PopupState, { bindHover, bindPopover } from "material-ui-popup-state"
import HoverPopover from "material-ui-popup-state/HoverPopover"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { useWindowSize } from "@react-hook/window-size"
import { Cell } from "../Shared"

const MyTableContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
}))

type Props = {
    id: string
    data: ICategoriesTable | undefined
}

const Category: React.FC<Props> = ({ id, data }) => {
    const theme = useTheme()

    const { locale } = useRouter()

    const [width] = useWindowSize()

    const laptopCategoriesPerTable = 6

    const getTitleWithFallback = useCallback(
        (entity: ICategoriesTable) => {
            if (!entity?.title) return "undefined"
            return (
                entity?.title?.[
                    (typeof locale === "string"
                        ? locale
                        : AppConfig.defaultAppLanguage) as keyof ICategoryTitleWithLanguages
                ] ?? "undefined"
            )
        },
        [locale],
    )

    const getTableHeight = useCallback(
        (body: [ICategoriesTable[]]) =>
            Object.values(body).reduce(
                (p, c, i, a) => (a[p].length > c.length ? p : i),
                0,
            ),
        [],
    )

    const createCellWithLink = useCallback(
        (entity: ICategoriesTable | undefined) => {
            if (typeof entity === "undefined") return <Cell></Cell>
            return (
                <Cell key={entity.id}>
                    <Link
                        href={`${
                            StaticRoutes.Category.template + "/" + entity.id
                        }`}
                    >
                        {getTitleWithFallback(entity)}
                    </Link>
                </Cell>
            )
        },
        [getTitleWithFallback],
    )

    const getTableHeaders = useCallback(
        (table: ICategoriesTable | undefined) =>
            table?.children?.map(v => createCellWithLink(v)) ?? [],
        [createCellWithLink],
    )

    const unpack = useCallback(
        (
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
        },
        [],
    )

    const createTableCells = useCallback(
        (
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
        },
        [createCellWithLink],
    )

    const partition = useCallback(
        (array: ReactElement[], n: number): ReactElement[][] => {
            return array.length
                ? [array.splice(0, n)].concat(partition(array, n))
                : []
        },
        [],
    )

    const createTableData = useCallback(
        (table: ICategoriesTable) => {
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
        },
        [createTableCells, getTableHeaders, getTableHeight, partition, unpack],
    )

    const [title, headers, columns] = useMemo(() => {
        if (data == undefined) return [null, [], []]

        const title = getTitleWithFallback(data)
        const { headers, columns } = createTableData(data)

        return [title, headers, columns]
    }, [data, createTableData, getTitleWithFallback])

    const desktopHtml = useMemo(
        () => (
            <MyTableContainer elevation={0}>
                <Table size="small">
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
            </MyTableContainer>
        ),
        [columns, headers],
    )

    const laptopHtml = useMemo(
        () => (
            <Stack>
                {new Array(Math.ceil(headers.length / laptopCategoriesPerTable))
                    .fill(0)
                    .map((_, i) => i + 1)
                    .map(v => (
                        <React.Fragment key={v}>
                            <MyTableContainer elevation={0}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            {headers
                                                ?.slice(
                                                    (v - 1) *
                                                        laptopCategoriesPerTable,
                                                    v *
                                                        laptopCategoriesPerTable,
                                                )
                                                ?.map((h, i) => (
                                                    <React.Fragment key={i}>
                                                        <>{h}</>
                                                    </React.Fragment>
                                                ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {columns.map((column, i) => (
                                            <TableRow key={i}>
                                                {column
                                                    .slice(
                                                        (v - 1) *
                                                            laptopCategoriesPerTable,
                                                        v *
                                                            laptopCategoriesPerTable,
                                                    )
                                                    .map((row, i) => (
                                                        <React.Fragment key={i}>
                                                            <>{row}</>
                                                        </React.Fragment>
                                                    ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </MyTableContainer>
                        </React.Fragment>
                    ))}
            </Stack>
        ),
        [laptopCategoriesPerTable, columns, headers],
    )

    const [content, setContent] = useState<ReactElement>(desktopHtml)

    useEffect(
        () =>
            width >= theme.breakpoints.values.lg
                ? setContent(desktopHtml)
                : setContent(laptopHtml),
        [theme.breakpoints.values.lg, laptopHtml, desktopHtml, width],
    )

    const popoverHtml = useMemo(
        () => (
            <PopupState variant="popover" popupId={id}>
                {popupState => (
                    <div>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            justifyItems="center"
                            {...bindHover(popupState)}
                        >
                            <Typography>{title}</Typography>
                            {popupState.isOpen ? (
                                <ArrowDropUpIcon />
                            ) : (
                                <ArrowDropDownIcon />
                            )}
                        </Stack>
                        <HoverPopover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="center"
                                justifyItems="center"
                            >
                                {content}
                            </Stack>
                        </HoverPopover>
                    </div>
                )}
            </PopupState>
        ),
        [id, content, title],
    )

    const [popoverContent, setPopoverContent] = useState<ReactElement | null>(
        popoverHtml,
    )

    useEffect(
        () =>
            width >= theme.breakpoints.values.md
                ? setPopoverContent(popoverHtml)
                : setPopoverContent(null),
        [theme.breakpoints.values.md, popoverHtml, width],
    )

    return <>{popoverContent}</>
}

export default Category
