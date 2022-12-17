import { useRouter } from "next/router"
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
import AppConfig from "../../../app.config"
import { useWindowSize } from "@react-hook/window-size"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useGetPopularBrands } from "../../routes"
import { IBrands } from "../../types/brands"

const Container = styled(Paper)(({ theme }) => ({
    width: "100%",
    margin: theme.spacing(5, "auto"),
    borderTop: `1px solid ${theme.palette.primary.light}`,
}))

const MyTable = styled(Table)(({ theme }) => ({
    margin: "auto",
    width: "90%",
}))

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
        [...(brands ?? [])],
        [
            t("company.about-us"),
            t("company.career"),
            t("company.find-a-store"),
            t("company.rules-and-terms"),
            t("company.sitemap"),
        ],
        [
            t("help.contact-us"),
            t("help.money-refund"),
            t("help.order-status"),
            t("help.shipping-info"),
            t("help.open-dispute"),
        ],
        [
            t("account.user-login"),
            t("account.user-register"),
            t("account.account-settings"),
            t("account.my-orders"),
        ],
        [
            <Stack direction="row" alignItems="center" gap={1}>
                <FacebookIcon />
                {t("social.facebook")}
            </Stack>,
            <Stack direction="row" alignItems="center" gap={1}>
                <TwitterIcon />
                {t("social.twitter")}
            </Stack>,
            <Stack direction="row" alignItems="center" gap={1}>
                <InstagramIcon />
                {t("social.instagram")}
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
            const short = current.toLowerCase() as keyof Data
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
                brands,
            }
        }, {})

        return [desk, mob]
    }, [brands])

    return (
        <footer>
            <Container elevation={0}>
                {width >= theme.breakpoints.values.md ? (
                    <TableContainer component={Paper}>
                        <MyTable>
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
                        </MyTable>
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
                                                row => (
                                                    <Typography
                                                        variant="body1"
                                                        key={row}
                                                    >
                                                        {row}
                                                    </Typography>
                                                ),
                                            )}
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                    </>
                )}
            </Container>
        </footer>
    )
}

export default Footer
