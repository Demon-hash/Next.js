import React from 'react';
import Product from "./Product";
import {IProduct} from "../../types/product";
import {styled} from "@mui/material/styles";
import {Grid} from "@mui/material";

type Props = {
    products: IProduct[];
    gap: number;
}

const ProductList: React.FC<Props> = ({products, gap}) => {
    const List = styled(Grid)(({theme}) => ({
        position: "relative",
        width: "90%",
        margin: theme.spacing(5, 'auto'),
        maxHeight: 400
    }));

    return (
        <List container gap={gap}>
            {products.map((product) =>
                <Product
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    img={product.img}
                    price={product.price}
                    gap={gap}
                />
            )}
        </List>
    );
};

export default ProductList;