const defaultAppLanguage = "en" as const

export interface ICategories {
    categories: string[]
}

export interface ICategoryTitleWithLanguages {
    [defaultAppLanguage]: string
    ru: string
    de: string
}

export interface ICategoriesTable {
    id?: string
    title: ICategoryTitleWithLanguages
    parent?: string
    children?: ICategoriesTable[]

    popular?: {
        id: string[]
        img: string[]
    }
}
