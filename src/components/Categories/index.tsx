import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import {
    Paper,
    Popover,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material"
import { useTranslation } from "next-i18next"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Image from "next/image"

const Navigation = styled(Stack)(({ theme }) => ({
    width: "90%",
    margin: "auto",
    [theme.breakpoints.up("md")]: {
        justifyContent: "flex-start",
    },
}))

const Cell = styled(TableCell)(() => ({
    border: 0,
}))

type Data = {
    clothing: string
    shoes: string
    watches: string
}

import img from "../../../public/assets/img/1.jpg"
import styles from "../../styles/components/image.module.css"

const Categories: React.FC = () => {
    const { t } = useTranslation("common")
    const categories: string[] = [t("woman")] //, t("man"), t("kid")];

    const headers = [
        "CLOTHING",
        "SHOES",
        "WATCHES", // "JEWELLERY", "EYEWEAR", "HANDBAGS & CLUTCHES"
    ]

    const table: string[][] = [
        [
            "New Arrivals",
            "Top Brands",
            "All Western Wear",
            "Shirts, Tops & Tees",
            "Dresses",
            "Jeans & Jeggings",
            "All Ethnic Wear",
            "Kurtas",
            "Salwar Suits",
            "Sarees",
            "Lingerie, Sleep & Lounge",
            "Sportswear",
        ],
        [
            "Fashion Sandals",
            "Pumps & Peeptoes",
            "Casual Slippers",
            "Casual Shoes",
            "Boots",
            "Sports Shoes",
            "Flip-Flops",
            "Ballet Flats",
            "Ethnic Footwear",
            "Formal Shoes",
        ],
        ["Gold & rose-gold", "Stainless steel", "Leather"],
        /*[
            "Gold & Diamond Jewellery",
            "Traditional Imitation",
            "Fashion Jewellery",
            "Silver Jewellery",
        ],
        [
            "Sunglasses",
            "Spectacle Frames"
        ],
        [
            "Handbags",
            "Wallets"
        ]*/
    ]

    const createRowData = (
        clothing: string,
        shoes: string,
        watches: string,
    ): Data => ({ clothing, shoes, watches })

    const createRows = (table: string[][]): Data[] => {
        const len = headers.length
        const res: Data[] = []

        for (let i = 0; i < len; i++) {
            res.push(createRowData(table[0][i], table[1][i], table[2][i]))
        }

        return res
    }

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }

    const [rows] = useState<Data[]>(createRows(table))
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

    return (
        <Navigation direction="row" alignItems="center" spacing={3}>
            {categories.map(item => (
                <React.Fragment key={item}>
                    <Typography
                        variant="body1"
                        component="div"
                        onMouseEnter={handlePopoverOpen}
                    >
                        <Stack direction="row">
                            <span>{item}</span>
                            <ExpandMoreIcon />
                        </Stack>
                    </Typography>
                    <Popover
                        sx={{
                            pointerEvents: "none",
                        }}
                        open={!!anchorEl}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Stack
                            direction="row"
                            sx={{
                                width: "100vw",
                            }}
                        >
                            <TableContainer component={Paper} elevation={0}>
                                <Table
                                    sx={{
                                        width: "40%",
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            {headers.map(h => (
                                                <Cell key={h}>{h}</Cell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(row => (
                                            <TableRow key={row.clothing}>
                                                <Cell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {row.clothing}
                                                </Cell>
                                                <Cell>{row.shoes}</Cell>
                                                <Cell>{row.watches}</Cell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {[1, 2, 3].map(() => (
                                <div
                                    className={styles.imageContainer}
                                    role="img"
                                >
                                    <Image
                                        src={img}
                                        alt="*"
                                        style={{ objectFit: "contain" }}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </Stack>
                    </Popover>
                </React.Fragment>
            ))}
        </Navigation>
    )
}

export default Categories
