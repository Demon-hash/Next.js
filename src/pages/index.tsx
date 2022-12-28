import React from "react"
import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import AppConfig from "../../app.config"
import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import { Carousel, Page, ProductList } from "../components"
import { styled } from "@mui/material/styles"
import { IProduct } from "../types/product"
import { useTranslation } from "next-i18next"
import { useGetBannerSlides, useGetPopularClothes } from "../routes"
import { useRouter } from "next/router"
import Categories from "../components/Categories"
import { ICarouselItem } from "../types/carousel-item"

const Container = styled(Paper)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
    position: "relative",
    width: "100%",
    padding: theme.spacing(1, 0),
    margin: theme.spacing(1, "auto"),
    borderBottom: `1px solid ${theme.palette.primary.light}`,
}))

const GridContainer = styled(Grid)(({ theme }) => ({
    position: "relative",
    width: "90%",
    margin: theme.spacing(5, "auto"),
    maxHeight: 400,
}))

type Props = {}

const IndexPage: React.FC<Props> = () => {
    const { t } = useTranslation("common")
    const { locale } = useRouter()

    const { data: products, isLoading: productsIsLoading } =
        useGetPopularClothes<IProduct[]>({
            locale: locale ?? "",
            limit: 6,
        })

    const { data: slides, isLoading: slidesIsLoading } = useGetBannerSlides<
        ICarouselItem[]
    >({})

    return (
        <Page>
            <Container elevation={0}>
                <Categories />
            </Container>
            {!slidesIsLoading && (
                <GridContainer container gap={2}>
                    <Grid item xs={12}>
                        <Carousel items={slides ?? []} height={400} />
                    </Grid>
                </GridContainer>
            )}
            <GridContainer container>
                <Typography variant="h5" component="div">
                    {t("popular")}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="outlined">{t("see-all-clothes")}</Button>
            </GridContainer>
            {!productsIsLoading && (
                <ProductList products={products ?? []} gap={1} />
            )}
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
