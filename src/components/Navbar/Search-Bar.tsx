import React, { useEffect, useMemo, useState } from "react"
import {
    FormControl,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    SelectChangeEvent,
    SelectProps,
    TextField,
    TextFieldProps,
} from "@mui/material"
import { Search } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { useRouter } from "next/router"
import { useSearchCategories } from "../../routes"
import { ICategories } from "../../types/categories"
import { LanguageSwitcher } from "../index"

const Container = styled(TextField)<TextFieldProps>(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
    [theme.breakpoints.up("md")]: {
        width: "50%",
    },
    ".MuiOutlinedInput-root": {
        "& > fieldset": {
            border: 0,
            outline: 0,
        },
        color: theme.palette?.appSearchBar?.contrastText,
        background: theme.palette?.appNavBar?.dark,
        border: 0,
        outline: 0,
    },
}))

const SelectCategory = styled(Select)<SelectProps>(({ theme }) => ({
    ".MuiSelect-standard, .MuiSelect-icon": {
        color: theme.palette?.appSearchBar?.dark,
        background: 0,
    },
}))

const SearchIcon = styled(Search)(({ theme }) => ({
    color: theme.palette?.appSearchBar?.dark,
}))

const SearchBar: React.FC = () => {
    const { locale } = useRouter()
    const [categories, setCategories] = useState<string[] | undefined>(
        undefined,
    )
    const [category, setCategory] = useState<string | null>(null)

    const { data } = useSearchCategories<ICategories>({ locale: locale ?? "" })

    useMemo(() => {
        if (!data || typeof data !== "object" || !data?.categories) return
        setCategories(data.categories?.sort((a, b) => a?.localeCompare(b)))
    }, [data])

    useEffect(() => {
        if (categories == null) return
        setCategory(categories[0])
    }, [categories])

    const search = () => {
        return
    }

    const changeSearchCategory = (event: unknown) => {
        setCategory((event as SelectChangeEvent).target.value)
    }

    return categories?.length ? (
        <Container
            type="text"
            variant="outlined"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <FormControl variant="standard">
                            <SelectCategory
                                value={category ?? ""}
                                onChange={changeSearchCategory}
                                disableUnderline={true}
                            >
                                {categories.map(el => (
                                    <MenuItem value={el} key={el}>
                                        {el}
                                    </MenuItem>
                                ))}
                            </SelectCategory>
                        </FormControl>
                    </InputAdornment>
                ),
                endAdornment: (
                    <>
                        <InputAdornment position="end">
                            <LanguageSwitcher />
                        </InputAdornment>
                        <InputAdornment position="end">
                            <IconButton
                                onClick={search}
                                onMouseDown={search}
                                edge="end"
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    </>
                ),
            }}
        />
    ) : (
        <></>
    )
}

export default SearchBar
