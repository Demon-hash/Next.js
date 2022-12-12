import React, {useState} from 'react';
import {useRouter} from "next/router";
import {FormControl, FormControlProps, MenuItem, Select, SelectChangeEvent, SelectProps} from "@mui/material";
import {styled} from "@mui/material/styles";

const LanguageForm = styled(FormControl)<FormControlProps>(({ theme }) => ({
    '.MuiOutlinedInput-root': {
        '& > fieldset': {
            border: 0,
            outline: 0
        }
    }
}));

const SelectLanguage = styled(Select)<SelectProps>(({theme}) => ({
    '.MuiSelect-outlined, .MuiSelect-icon': {
        color: theme.palette?.appSearchBar?.contrastText
    }
}));

type Props = {}

const LanguageSwitcher: React.FC<Props> = ({}) => {
    const router = useRouter();
    const {pathname, asPath, query, locale} = router;

    const languages = [
        {code: "en", name: "English"},
        {code: "ru", name: "Русский"},
        {code: "de", name: "Deutsch"}
    ];

    const [language, setLanguage] = useState<typeof languages[0]>(languages[Math.max(0, languages.findIndex(el => el.code === locale))]);

    const changeLanguage = (event: unknown) => {
        const index = Math.max(0, languages.findIndex(el => el.code === (event as SelectChangeEvent).target.value));
        setLanguage(languages[index]);

        void router.push({pathname, query}, asPath, {locale: languages[index].code});
    }

    return (
        <LanguageForm variant="outlined">
            <SelectLanguage
                defaultValue={languages[0].code}
                value={language.code}
                onChange={changeLanguage}
                disableUnderline={true}
            >
                {languages.map((el) => <MenuItem value={el.code} key={el.code}>{el.name}</MenuItem>)}
            </SelectLanguage>
        </LanguageForm>
    );
}

export default LanguageSwitcher;