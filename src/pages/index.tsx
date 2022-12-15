import React from "react"
import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import AppConfig from "../../app.config"
import {
    Box,
    Button,
    Grid,
    List,
    Paper,
    Stack,
    Typography,
} from "@mui/material"
import { Carousel, Page, ProductList } from "../components"
import { styled } from "@mui/material/styles"

const Container = styled(Paper)(({ theme }) => ({
    position: "relative",
    width: "100%",
    padding: theme.spacing(1, 0),
    margin: theme.spacing(1, "auto"),
    borderBottom: `1px solid ${theme.palette.primary.light}`,
}))

const Navigation = styled(List)(() => ({
    width: "90%",
    margin: "auto",
}))

const GridContainer = styled(Grid)(({ theme }) => ({
    position: "relative",
    width: "90%",
    margin: theme.spacing(5, "auto"),
    maxHeight: 400,
}))

import img from "../../public/assets/img/1.jpg"
import banner from "../../public/assets/img/3.jpg"
import banner2 from "../../public/assets/img/4.jpg"

import { IProduct } from "../types/product"
import { useTranslation } from "next-i18next"

type Props = {}

const IndexPage: React.FC<Props> = () => {
    const { t } = useTranslation("common")
    const categories: string[] = [t("woman"), t("man"), t("kid")]

    const products: IProduct[] = new Array(8).fill(0).map((item, index) => ({
        id: index,
        name: `Product #${index}`,
        price: "179.99",
        img,
    }))

    const items = [{ img: banner }, { img: banner2 }, { img: banner }]

    return (
        <Page>
            <Container elevation={0}>
                <Navigation
                    component={Stack}
                    direction="row"
                    alignItems="center"
                    spacing={3}
                >
                    {categories.map(item => (
                        <Typography variant="body1" component="div" key={item}>
                            {item}
                        </Typography>
                    ))}
                </Navigation>
            </Container>
            <GridContainer container gap={2}>
                <Grid item xs={12}>
                    <Carousel items={items} height={400} />
                </Grid>
            </GridContainer>
            <GridContainer container>
                <Typography variant="h5" component="div">
                    {t("popular")}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="outlined">{t("see-all-clothes")}</Button>
            </GridContainer>
            <ProductList products={products} gap={1} />
        </Page>
    )
}

export const getServerSideProps: GetServerSideProps = async ({
    locale = AppConfig.defaultAppLanguage,
}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "navbar",
                "auth",
                "cart",
                "common",
                "header",
                "footer",
            ])),
        },
    }
}

export default IndexPage
