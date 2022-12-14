import React from "react"
import {GetServerSideProps} from "next"
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import AppConfig from "../../app.config"
import {
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemText, Pagination,
    Paper,
    Stack,
    Typography
} from "@mui/material"
import {Page} from "../components"
import {styled} from "@mui/material/styles"
import Carousel from "react-material-ui-carousel";

const Container = styled(Paper)(({theme}) => ({
    position: "relative",
    width: "100%",
    padding: theme.spacing(1, 0),
    margin: theme.spacing(1, "auto"),
    borderBottom: `1px solid ${theme.palette.primary.light}`
}))

const Navigation = styled(List)(({theme}) => ({
    width: "90%",
    margin: "auto"
}));

const Table = styled(List)(({theme}) => ({
    border: `1px solid ${theme.palette.primary.light}`
}));

const GridContainer = styled(Grid)(({theme}) => ({
    position: "relative",
    width: "90%",
    margin: theme.spacing(5, 'auto'),
    maxHeight: 400,
}));

import img from "../../public/assets/img/1.jpg"

import ProductList from "../components/Products/Product-List";
import {IProduct} from "../types/product";

type Props = {}

const IndexPage: React.FC<Props> = () => {

    const navItems: string[] = [
        "Home", "About", "Supermarket",
        "Partnership", "Baby & Toys", "Fitness Sport",
        "Clothing", "Furnitures"
    ];

    const tableItems: string[] = [
        "Best clothes", "Automobiles",
        "Home interior", "Electronics",
        "Technologies", "Digital goods"
    ];

    const products: IProduct[] = new Array(8).fill(0).map((item, index) => ({
        id: index,
        name: `Product #${index}`,
        price: "179.99",
        img
    }));

    return (
        <Page>
            <Container elevation={0}>
                <Navigation component={Stack} direction="row" alignItems="center" spacing={3}>
                    {navItems.map(item => <Typography variant="body1" component="div" key={item}>{item}</Typography>)}
                    <Typography variant="body1" component="div">More</Typography>
                </Navigation>
            </Container>
            <GridContainer container gap={2}>
                <Grid item xs={3}>
                    <Table component="nav">
                        {tableItems.map(item => <>
                            <ListItemButton>
                                <ListItemText primary={item}/>
                            </ListItemButton>
                            <Divider/>
                        </>)}
                        <ListItemButton>
                            <ListItemText primary="More items"/>
                        </ListItemButton>
                    </Table>
                </Grid>
                <Grid item xs={8}>
                    {/*<Carousel>*/}
                    {/*    {items.map((item, i) =>*/}
                    {/*        <Image src={img} alt="*" fill sizes="400" loading="lazy"/>*/}
                    {/*    )}*/}
                    {/*</Carousel>*/}
                </Grid>
            </GridContainer>
            <GridContainer container gap={1}>
                <Typography variant="h5" component="div">Popular products</Typography>
            </GridContainer>
            <ProductList products={products} gap={3}/>
            <Pagination count={100} boundaryCount={3} size="large" showFirstButton showLastButton/>
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
                "header",
                "footer",
            ])),
        },
    }
}

export default IndexPage
