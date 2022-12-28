import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useTranslation } from "next-i18next"
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

const Container = styled(Paper)(({ theme }) => ({
    width: "100%",
    margin: theme.spacing(5, "auto"),
    borderTop: `1px solid ${theme.palette.primary.light}`,
}))

const MyTable = styled(Table)(() => ({
    width: "90%",
    margin: "auto",
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

type RowsArray = {
    [K in keyof Data]: (keyof Data[K])[]
}

const Footer: React.FC = () => {
    const theme = useTheme()
    const [width] = useWindowSize()
    const { t } = useTranslation("footer")
    const { locale } = useRouter()
    const { data } = useGetPopularBrands<IBrands>({ locale: locale ?? "" })

    const [brands, setBrands] = useState<string[]>([])

    const Company = AppConfig.appName
    const Year = new Date().getFullYear()

    const headers: Headers[] = useMemo(
        () => [
            t("brands.header"),
            t("company.header"),
            t("help.header"),
            t("account.header"),
            t("social.header"),
        ],
        [t],
    )

    const createBrandLinks = useCallback(() => {
        return brands.map(value => (
            <Link
                key={`${StaticRoutes.Brands.template}/${value}`}
                href={`${StaticRoutes.Brands.template}/${value.toLowerCase()}`}
            >
                {value}
            </Link>
        ))
    }, [brands])

    const table: Rows = useMemo(
        () => [
            [...createBrandLinks()],
            [
                <Link
                    href={StaticRoutes.Company.about}
                    key={StaticRoutes.Company.about}
                >
                    {t("company.about-us")}
                </Link>,
                <Link
                    href={StaticRoutes.Company.career}
                    key={StaticRoutes.Company.career}
                >
                    {t("company.career")}
                </Link>,
                <Link
                    href={StaticRoutes.Company.store}
                    key={StaticRoutes.Company.store}
                >
                    {t("company.find-a-store")}
                </Link>,
                <Link
                    href={StaticRoutes.Company.rules}
                    key={StaticRoutes.Company.rules}
                >
                    {t("company.rules-and-terms")}
                </Link>,
                <Link
                    href={StaticRoutes.Company.sitemap}
                    key={StaticRoutes.Company.sitemap}
                >
                    {t("company.sitemap")}
                </Link>,
            ],
            [
                <Link
                    href={StaticRoutes.Help.contact}
                    key={StaticRoutes.Help.contact}
                >
                    {t("help.contact-us")}
                </Link>,
                <Link
                    href={StaticRoutes.Help.refund}
                    key={StaticRoutes.Help.refund}
                >
                    {t("help.money-refund")}
                </Link>,
                <Link
                    href={StaticRoutes.Help.order}
                    key={StaticRoutes.Help.order}
                >
                    {t("help.order-status")}
                </Link>,
                <Link
                    href={StaticRoutes.Help.shipping}
                    key={StaticRoutes.Help.shipping}
                >
                    {t("help.shipping-info")}
                </Link>,
                <Link
                    href={StaticRoutes.Help.dispute}
                    key={StaticRoutes.Help.dispute}
                >
                    {t("help.open-dispute")}
                </Link>,
            ],
            [
                <Link
                    href={StaticRoutes.Account.login}
                    key={StaticRoutes.Account.login}
                >
                    {t("account.user-login")}
                </Link>,
                <Link
                    href={StaticRoutes.Account.sign}
                    key={StaticRoutes.Account.sign}
                >
                    {t("account.user-register")}
                </Link>,
                <Link
                    href={StaticRoutes.Account.settings}
                    key={StaticRoutes.Account.settings}
                >
                    {t("account.account-settings")}
                </Link>,
                <Link
                    href={StaticRoutes.Account.orders}
                    key={StaticRoutes.Account.orders}
                >
                    {t("account.my-orders")}
                </Link>,
            ],
            [
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    key={StaticRoutes.Social.facebook}
                >
                    <FacebookIcon />
                    <Link href={StaticRoutes.Social.facebook}>
                        {t("social.facebook")}
                    </Link>
                </Stack>,
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    key={StaticRoutes.Social.twitter}
                >
                    <TwitterIcon />
                    <Link href={StaticRoutes.Social.twitter}>
                        {t("social.twitter")}
                    </Link>
                </Stack>,
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    key={StaticRoutes.Social.instagram}
                >
                    <InstagramIcon />
                    <Link href={StaticRoutes.Social.instagram}>
                        {t("social.instagram")}
                    </Link>
                </Stack>,
            ],
        ],
        [createBrandLinks, t],
    )

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

    const asDataKey = (key: Headers): keyof Data => {
        return (
            key.endsWith(".header")
                ? key.substring(0, key.indexOf(".header"))
                : key
        ).toLowerCase() as keyof Data
    }

    const [desktop, mobile] = useMemo(() => {
        if (!brands?.length) return []
        const length = getLargestRowIndex(table)

        const desktopRows: Data[] = new Array(length)
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

        const mobileRows = headers.reduce((result, current) => {
            const short = asDataKey(current)
            const data = desktopRows.reduce(
                (result, item, index) => ({
                    ...result,
                    [short]: [
                        ...([result?.[short]] ?? []),
                        <React.Fragment key={`${short + index}`}>
                            {item[short]}
                        </React.Fragment>,
                    ],
                }),
                {} as Data,
            )

            return {
                ...result,
                [short]: data[short],
                brands: createBrandLinks(),
            }
        }, {} as RowsArray)

        return [desktopRows, mobileRows]
    }, [brands, headers, createBrandLinks, table])

    // Hydration fix
    const mobileHtml = useMemo(
        () => (
            <>
                {mobile &&
                    headers.map(h => (
                        <Accordion key={h}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>{h}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={2}
                                >
                                    {mobile[asDataKey(h)]?.map((row, i) => (
                                        <React.Fragment key={i}>
                                            <>{row}</>
                                        </React.Fragment>
                                    ))}
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    ))}
            </>
        ),
        [headers, mobile],
    )

    const desktopHtml = useMemo(
        () => (
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
                        {desktop?.map((row, i) => (
                            <TableRow key={i}>
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
        ),
        [Year, Company, desktop, headers],
    )

    const [content, setContent] = useState(mobileHtml)
    useEffect(
        () =>
            width >= theme.breakpoints.values.md
                ? setContent(desktopHtml)
                : setContent(mobileHtml),
        [theme.breakpoints.values.md, mobileHtml, desktopHtml, width],
    )

    return (
        <footer>
            <Container elevation={0}>{content}</Container>
        </footer>
    )
}

export default Footer
