import { useRouter } from "next/router"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import React, { ReactElement, useEffect, useMemo, useState } from "react"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useWindowSize } from "@react-hook/window-size"
import AppConfig from "../../../app.config"
import { useGetPopularBrands } from "../../routes"
import { IBrands } from "../../types/brands"
import { StaticRoutes } from "../../static-routes"

const Cell = styled(TableCell)(() => ({
    border: 0,
}))

type Headers = `${keyof Data}.header`

type Data = {
    brand: string
    company: string
    help: string
    account: string
    social: ReactElement
}

type Rows = (Data[keyof Data] | (string | null))[][]

const Footer: React.FC = () => {
    const theme = useTheme()
    const [width] = useWindowSize()
    const { t } = useTranslation("footer")
    const { locale } = useRouter()
    const { data } = useGetPopularBrands<IBrands>({ locale: locale ?? "" })

    const [brands, setBrands] = useState<string[]>([])

    const Company = AppConfig.appName
    const Year = new Date().getFullYear()

    const headers: Headers[] = [
        t("brands.header"),
        t("company.header"),
        t("help.header"),
        t("account.header"),
        t("social.header"),
    ]

    useEffect(() => {
        if (!data?.brands) return
        setBrands(data.brands)
    }, [data])

    const createBrandLinks = (data: typeof brands): JSX.Element[] => {
        return data.map(value => (
            <Link
                href={`${StaticRoutes.Brands.template}/${value.toLowerCase()}`}
            >
                {value}
            </Link>
        ))
    }

    const createRowData = (
        brand: string,
        company: string,
        help: string,
        account: string,
        social: ReactElement,
    ): Data => ({ brand, company, help, account, social })

    const getLargestRowIndex = (table: Rows): number =>
        table[table.reduce((p, c, i, a) => (a[p].length > c.length ? p : i), 0)]
            .length

    const createAndFillTable = (): Rows => [
        [...createBrandLinks(brands ?? [])],
        [
            <Link href={StaticRoutes.Company.about}>
                {t("company.about-us")}
            </Link>,
            <Link href={StaticRoutes.Company.career}>
                {t("company.career")}
            </Link>,
            <Link href={StaticRoutes.Company.store}>
                {t("company.find-a-store")}
            </Link>,
            <Link href={StaticRoutes.Company.rules}>
                {t("company.rules-and-terms")}
            </Link>,
            <Link href={StaticRoutes.Company.sitemap}>
                {t("company.sitemap")}
            </Link>,
        ],
        [
            <Link href={StaticRoutes.Help.contact}>
                {t("help.contact-us")}
            </Link>,
            <Link href={StaticRoutes.Help.refund}>
                {t("help.money-refund")}
            </Link>,
            <Link href={StaticRoutes.Help.order}>
                {t("help.order-status")}
            </Link>,
            <Link href={StaticRoutes.Help.shipping}>
                {t("help.shipping-info")}
            </Link>,
            <Link href={StaticRoutes.Help.dispute}>
                {t("help.open-dispute")}
            </Link>,
        ],
        [
            <Link href={StaticRoutes.Account.login}>
                {t("account.user-login")}
            </Link>,
            <Link href={StaticRoutes.Account.sign}>
                {t("account.user-register")}
            </Link>,
            <Link href={StaticRoutes.Account.settings}>
                {t("account.account-settings")}
            </Link>,
            <Link href={StaticRoutes.Account.orders}>
                {t("account.my-orders")}
            </Link>,
        ],
        [
            <Stack direction="row" alignItems="center" gap={1}>
                <FacebookIcon />
                <Link href={StaticRoutes.Social.facebook}>
                    {t("social.facebook")}
                </Link>
            </Stack>,
            <Stack direction="row" alignItems="center" gap={1}>
                <TwitterIcon />
                <Link href={StaticRoutes.Social.twitter}>
                    {t("social.twitter")}
                </Link>
            </Stack>,
            <Stack direction="row" alignItems="center" gap={1}>
                <InstagramIcon />
                <Link href={StaticRoutes.Social.instagram}>
                    {t("social.instagram")}
                </Link>
            </Stack>,
        ],
    ]

    const [desktop, mobile] = useMemo(() => {
        if (!brands?.length) return []

        const table = createAndFillTable()
        const length = getLargestRowIndex(table)

        const desk: Data[] = new Array(length)
            .fill(null)
            .map((_, j) =>
                createRowData(
                    (table[0][j] as string) ?? "",
                    (table[1][j] as string) ?? "",
                    (table[2][j] as string) ?? "",
                    (table[3][j] as string) ?? "",
                    (table[4][j] as ReactElement) ?? <></>,
                ),
            )

        const mob = headers.reduce((previous, current) => {
            const short = current.toLowerCase()
            const data = desk.reduce(
                (acc, item) => ({
                    ...acc,
                    [short]: [...(acc?.[short] ?? []), item[short]],
                }),
                {} as Data,
            )

            return {
                ...previous,
                [short]: data[short],
                brands: createBrandLinks(brands),
            }
        }, {})

        return [desk, mob]
    }, [brands, createAndFillTable, createBrandLinks, headers])

    return (
        <footer>
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    margin: theme.spacing(5, "auto"),
                    borderTop: `1px solid ${theme.palette.primary.light}`,
                }}
            >
                {width >= theme.breakpoints.values.md ? (
                    <TableContainer component={Paper}>
                        <Table
                            sx={{
                                width: "90%",
                                margin: "auto",
                            }}
                        >
                            <caption>
                                {Year} {Company}
                            </caption>
                            <TableHead>
                                <TableRow>
                                    {headers.map(h => (
                                        <Cell key={h}>{h}</Cell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {desktop?.map(row => (
                                    <TableRow key={row.brand}>
                                        <Cell component="th" scope="row">
                                            {row.brand}
                                        </Cell>
                                        <Cell>{row.company}</Cell>
                                        <Cell>{row.help}</Cell>
                                        <Cell>{row.account}</Cell>
                                        <Cell>{row.social}</Cell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <>
                        {mobile &&
                            headers.map(h => (
                                <Accordion key={h}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography>{h}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack
                                            direction="column"
                                            alignItems="center"
                                            justifyContent="center"
                                            spacing={2}
                                        >
                                            {mobile[h.toLowerCase()]?.map(
                                                (row, i) => (
                                                    <React.Fragment key={i}>
                                                        {row}
                                                    </React.Fragment>
                                                ),
                                            )}
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                    </>
                )}
            </Paper>
        </footer>
    )
}

export default Footer
