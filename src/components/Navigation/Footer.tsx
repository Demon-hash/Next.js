import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import React, { ReactNode, useEffect, useState } from "react"
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
import { styled } from "@mui/material/styles"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import AppConfig from "../../../app.config"

const Container = styled(Paper)(({ theme }) => ({
    width: "100%",
    margin: theme.spacing(5, "auto"),
    borderTop: `1px solid ${theme.palette.primary.light}`,
}))

const MyTable = styled(Table)(() => ({
    width: "90%",
    margin: "auto",
}))

const Cell = styled(TableCell)(() => ({
    border: 0,
}))

type FooterTable = {
    brand: string
    company: string
    help: string
    account: string
    social: ReactNode
}

const Footer: React.FC = () => {
    const { t } = useTranslation("footer")
    const { locale } = useRouter()

    const [brands, setBrands] = useState([])

    const head = [
        t("brands.header"),
        t("company.header"),
        t("help.header"),
        t("account.header"),
        t("social.header"),
    ]
    const [body, setBody] = useState<FooterTable[]>([])

    const Company = AppConfig.appName
    const Year = new Date().getFullYear()

    const getBrands = () => {
        fetch(`/api/popular/brands?country=${locale}`)
            .then(res => res.json())
            .then(data => setBrands(data?.brands ?? []))
            .catch()
    }

    useEffect(() => getBrands(), [])
    useEffect(() => getBrands(), [locale])

    useEffect(() => {
        if (!brands?.length) return

        const table = [
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

        const len =
            table[
                table.reduce(
                    (p, c, i, a) => (a[p].length > c.length ? p : i),
                    0,
                )
            ].length

        const createData = (
            brand: string,
            company: string,
            help: string,
            account: string,
            social: ReactNode,
        ) => ({ brand, company, help, account, social })

        setBody(
            new Array(len)
                .fill(null)
                .map((_, j) =>
                    createData(
                        (table[0][j] as string) ?? "",
                        (table[1][j] as string) ?? "",
                        (table[2][j] as string) ?? "",
                        (table[3][j] as string) ?? "",
                        (table[4][j] as ReactNode) ?? <></>,
                    ),
                ),
        )
    }, [brands])

    return (
        <footer>
            <Container elevation={0}>
                <TableContainer component={Paper}>
                    <MyTable>
                        <caption>
                            {Year} {Company}
                        </caption>
                        <TableHead>
                            <TableRow>
                                {head.map(h => (
                                    <Cell key={h}>{h}</Cell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {body.map(row => (
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
            </Container>
        </footer>
    )
}

export default Footer
