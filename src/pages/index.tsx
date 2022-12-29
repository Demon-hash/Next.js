import React from "react"
import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import AppConfig from "../../app.config"
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material"
import { Carousel, Page, ProductList, Category } from "../components"
import { styled } from "@mui/material/styles"
import { IProduct } from "../types/product"
import { useTranslation } from "next-i18next"
import {
    getWomenCategoriesTable,
    getMenCategoriesTable,
    useGetBannerSlides,
    useGetPopularClothes,
} from "../routes"
import { useRouter } from "next/router"
import { ICarouselItem } from "../types/carousel-item"
import { ICategoriesTable } from "../types/categories"

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

const Navigation = styled(Stack)(({ theme }) => ({
    width: "90%",
    margin: "auto",
    [theme.breakpoints.up("md")]: {
        justifyContent: "flex-start",
    },
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
    const { data: womenData, isLoading: womenDataIsLoading } =
        getWomenCategoriesTable<ICategoriesTable>({})
    const { data: menData, isLoading: menDataIsLoading } =
        getMenCategoriesTable<ICategoriesTable>({})

    return (
        <Page>
            <Container elevation={0}>
                <Navigation direction="row" spacing={3}>
                    {!womenDataIsLoading && (
                        <Category id="women" data={womenData} />
                    )}
                    {!menDataIsLoading && <Category id="men" data={menData} />}
                </Navigation>
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
