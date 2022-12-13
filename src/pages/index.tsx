import React from "react"
import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import AppConfig from "../../app.config"

import Carousel from "react-material-ui-carousel"
import Image from "next/image"
import { Paper } from "@mui/material"

import { Page } from "../components"
import { styled } from "@mui/material/styles"

import Front from "../../public/assets/img/0.jpg"
import Front2 from "../../public/assets/img/1.jpg"
import Front3 from "../../public/assets/img/2.jpg"
import Front4 from "../../public/assets/img/4.jpg"

const Container = styled(Paper)(({ theme }) => ({
    position: "relative",
    width: "90%",
    margin: theme.spacing(0, "auto"),
}))

/*const Item = styled(Paper)(({ theme }) => ({
    position: "relative",
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}))*/

const CarouselItem = styled(Paper)(() => ({
    overflow: "hidden",
    width: "100%",
    maxHeight: 500,
}))

type Props = {}

const IndexPage: React.FC<Props> = () => {
    const items = [
        { img: Front },
        { img: Front2 },
        { img: Front3 },
        { img: Front4 },
    ]

    return (
        <Page>
            <Container>
                <Carousel
                    sx={{
                        position: "relative"
                    }}
                    animation="slide"
                    duration={1000}
                    swipe
                >
                    {
                        items.map((item, i) => <>
                            <CarouselItem key={i}>
                                <Image
                                    src={item.img}
                                    quality={100}
                                    alt="*"
                                />
                            </CarouselItem>
                        </>)
                    }
                </Carousel>
            </Container>
        </Page>
    )
}

export const getServerSideProps: GetServerSideProps = async ({
    locale = AppConfig.defaultAppLanguage,
}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "cart",
                "header",
                "footer",
            ])),
        },
    }
}

export default IndexPage
