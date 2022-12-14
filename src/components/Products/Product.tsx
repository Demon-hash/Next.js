import React from 'react';
import {styled} from "@mui/material/styles";
import {Paper, Typography} from "@mui/material";
import Image from "next/image";

import styles from "../../styles/components/product.module.css";
import {IProduct} from "../../types/product";

type Props = IProduct & {
    gap: number;
}

const Product: React.FC<Props> = ({name, img, price, gap}) => {

    const Item = styled(Paper)(({theme}) => ({
        position: "relative",
        width: `calc(25% - ${gap * 10}px)`,
        maxWidth: `calc(25% - ${gap * 10}px)`,
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        border: `1px solid ${theme.palette.primary.light}`
    }));

    return (
        <Item>
            <div className={styles.imageContainer} role="img">
                <Image src={img} className={styles.image} alt="*" fill loading="lazy"/>
            </div>
            <Typography variant="body1" component="p">{name}</Typography>
            <Typography variant="body1" component="p" sx={{fontWeight: "bold"}}>${price}</Typography>
        </Item>
    );
};

export default Product;