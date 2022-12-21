import React, { ChangeEvent, useState } from "react"
import Product from "./Product"
import { IProduct } from "../../types/product"
import { styled } from "@mui/material/styles"
import { Grid, Pagination } from "@mui/material"

type Props = {
    products: IProduct[]
    gap: number
    productsPerPage?: number
    pagination?: boolean
}

const ProductList: React.FC<Props> = ({
    products = [],
    gap,
    productsPerPage = 8,
    pagination = false,
}) => {
    const List = styled(Grid)(({ theme }) => ({
        position: "relative",
        width: "90%",
        margin: theme.spacing(5, "5%"),
    }))

    const [page, setPage] = useState<number>(1)

    const changePage = (_event: ChangeEvent<unknown>, page: number) => {
        setPage(
            Math.max(
                0,
                Math.min(page, Math.floor(products.length / productsPerPage)),
            ),
        )
    }

    return (
        <>
            <List container justifyContent="space-between" alignItems="center">
                {products
                    .slice(
                        Math.max(0, page - 1) * productsPerPage,
                        productsPerPage,
                    )
                    .map(product => (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            img={product.img}
                            price={product.price}
                            brand={product.brand}
                            colors={product.colors}
                            rating={product.rating}
                            discount={product.discount}
                            gap={gap}
                        />
                    ))}
            </List>
            {pagination && (
                <Pagination
                    count={Math.max(1, Math.floor(products.length / 10))}
                    boundaryCount={3}
                    size="large"
                    showFirstButton
                    showLastButton
                    onChange={changePage}
                />
            )}
        </>
    )
}

export default ProductList
