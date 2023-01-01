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
import { ICategoriesTable } from "../../types/categories"
import { StaticRoutes } from "../../static-routes"
import PopupState, { bindHover, bindPopover } from "material-ui-popup-state"
import HoverPopover from "material-ui-popup-state/HoverPopover"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { useWindowSize } from "@react-hook/window-size"
import { Cell } from "../Shared"
import getTableData, { CategoryFactory } from "../../utils/Category"

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

    const createCellWithLink = useCallback<CategoryFactory>(
        (entity, { getTitle }) => {
            if (typeof entity === "undefined") return <Cell></Cell>
            return (
                <Cell key={entity.id}>
                    <Link
                        href={`${
                            StaticRoutes.Category.template + "/" + entity.id
                        }`}
                    >
                        {getTitle(entity, locale)}
                    </Link>
                </Cell>
            )
        },
        [locale],
    )

    const { title, headers, columns } = useMemo(
        () => getTableData(data, locale, createCellWithLink),
        [data, locale, createCellWithLink],
    )

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
                                        {columns?.map((column, i) => (
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
