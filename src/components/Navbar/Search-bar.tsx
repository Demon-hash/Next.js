import React, { useEffect, useState } from "react"
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
import {useRouter} from "next/router";

const Container = styled(TextField)<TextFieldProps>(({ theme }) => ({
    width: "50%",
    ".MuiOutlinedInput-root": {
        "& > fieldset": {
            border: 0,
            outline: 0,
        },
        color: theme.palette?.appSearchBar?.light,
        background: theme.palette?.appNavBar?.dark,
        border: 0,
        outline: 0,
    },
}))

const SelectCategory = styled(Select)<SelectProps>(({ theme }) => ({
    ".MuiSelect-standard, .MuiSelect-icon": {
        color: theme.palette?.appSearchBar?.contrastText,
    },
}))

const SearchIcon = styled(Search)(({ theme }) => ({
    color: theme.palette?.appSearchBar?.contrastText,
}))

const SearchBar: React.FC = () => {
    const { locale } = useRouter();
    const [categories, setCategories] = useState<string[] | undefined>(
        undefined,
    )
    const [category, setCategory] = useState<string | null>(null)

    const loadCategories = () => {
        fetch(`/api/categories?l=${locale}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                if (!data || typeof data !== "object" || !data?.categories)
                    return
                setCategories(
                    (data.categories as string[])?.sort((a, b) =>
                        a?.localeCompare(b),
                    ),
                )
            })
            .catch(console.error)
    }

    useEffect(() => loadCategories(), []);
    useEffect(() => loadCategories(), [locale]);

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
            color="info"
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
                    <InputAdornment position="end">
                        <IconButton
                            onClick={search}
                            onMouseDown={search}
                            edge="end"
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    ) : (
        <></>
    )
}

export default SearchBar
