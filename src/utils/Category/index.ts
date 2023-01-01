import { ReactElement } from "react"
import AppConfig from "app.config"
import {
    ICategoriesTable,
    ICategoryTitleWithLanguages,
} from "../../types/categories"

type TileArgs = Parameters<typeof getTitleWithFallback>
type UnpackArgs = Parameters<typeof unpack>[0]
type HeadersArgs = Parameters<typeof getHeaders>
type BodyArgs = Parameters<typeof getHeight>[0]
type CellsArgs = Parameters<typeof createCells>
type ColumnsArgs = Parameters<typeof toColumns>

export type CategoryFactory = (
    entity: ICategoriesTable | undefined,
    opts: typeof FactoryFunctions,
) => ReactElement

const FactoryFunctions = {
    getTitle: getTitleWithFallback,
} as const

function getHeaders(
    table: ICategoriesTable | undefined,
    factory: CategoryFactory,
): ReactElement[] {
    return (
        table?.children?.map(v =>
            factory(v, { getTitle: getTitleWithFallback }),
        ) ?? []
    )
}

function getHeight(body: [ICategoriesTable[]]): number {
    return Object.values(body).reduce(
        (p, c, i, a) => (a[p].length > c.length ? p : i),
        0,
    )
}

function toColumns(
    array: ReturnType<typeof createCells>,
    n: number,
): ReactElement[][] {
    return array.length ? [array.splice(0, n)].concat(toColumns(array, n)) : []
}

function unpack(
    table: ICategoriesTable | ICategoriesTable[] | undefined,
): ICategoriesTable[] {
    if (table == undefined) return []
    const res: ICategoriesTable[] = []
    if (Array.isArray(table)) {
        table.forEach(v => {
            res.push(v, ...unpack(v.children))
        })
    } else {
        return [table]
    }
    return res
}

function createCells(
    headers: ReactElement[],
    table: [ICategoriesTable[]],
    height: number,
    factory: CategoryFactory,
): ReactElement[] {
    const cells = []
    for (let index = 0; index < table[height].length; index++) {
        for (let j = 0; j < headers.length; j++) {
            cells.push(
                factory(table?.[j]?.[index], {
                    getTitle: getTitleWithFallback,
                }),
            )
        }
    }
    return cells
}

function getTitleWithFallback(
    entity: ICategoriesTable,
    locale: string | undefined,
) {
    if (!entity?.title) return "undefined"
    return (
        entity?.title?.[
            (typeof locale === "string"
                ? locale
                : AppConfig.defaultAppLanguage) as keyof ICategoryTitleWithLanguages
        ] ?? "undefined"
    )
}

function createData(
    table: ICategoriesTable,
    locale: string | undefined,
    factory: CategoryFactory,
    fGetTitle: (
        a: TileArgs[0],
        b: TileArgs[1],
    ) => ReturnType<typeof getTitleWithFallback>,
    fHeaders: (
        a: HeadersArgs[0],
        b: HeadersArgs[1],
    ) => ReturnType<typeof getHeaders>,
    fUnpack: (a: UnpackArgs) => ReturnType<typeof unpack>,
    fCells: (
        a: CellsArgs[0],
        b: CellsArgs[1],
        c: CellsArgs[2],
        d: CellsArgs[3],
    ) => ReturnType<typeof createCells>,
    fHeight: (a: BodyArgs) => ReturnType<typeof getHeight>,
    fColumns: (
        a: ColumnsArgs[0],
        b: ColumnsArgs[1],
    ) => ReturnType<typeof toColumns>,
) {
    const title = fGetTitle(table, locale)
    const headers = fHeaders(table, factory)

    const body: BodyArgs =
        table?.children?.reduce(
            (acc, _, inx, arr) => ({
                ...acc,
                [inx]: fUnpack(arr[inx]?.children),
            }),
            {} as BodyArgs,
        ) ?? ({} as BodyArgs)

    const columns = fColumns(
        fCells(headers, body, fHeight(body), factory),
        headers.length,
    )

    return { title, headers, columns }
}

function getTableData(
    data: ICategoriesTable | undefined,
    locale: string | undefined,
    factory: CategoryFactory,
) {
    if (!data)
        return {
            title: "",
            headers: [],
            columns: [],
        }
    return createData(
        data,
        locale,
        factory,
        getTitleWithFallback,
        getHeaders,
        unpack,
        createCells,
        getHeight,
        toColumns,
    )
}

export default getTableData
