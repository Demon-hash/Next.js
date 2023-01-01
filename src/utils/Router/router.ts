import useSWR, { SWRResponse, Fetcher } from "swr"
import { API_ROUTE } from "../../routes"

type Params<T, V> = T & Record<string, V>

type Url = {
    segments: string[]
    hash: string
}

type WithBody<T, V> = { body: Params<T, V> }
type Post<T, V> = WithBody<T, V> & { method: "POST" }
type Patch<T, V> = WithBody<T, V> & { method: "PATCH" }
type Put<T, V> = WithBody<T, V> & { method: "PUT" }
type Delete<T, V> = WithBody<T, V> & { method: "DELETE" }
type Get<T, V> = {
    method: "GET"
    query: Params<T, V>
}

type Methods<T, V> =
    | Get<T, V>
    | Post<T, V>
    | Patch<T, V>
    | Put<T, V>
    | Delete<T, V>
type Props<T, V> = Url & Methods<T, V>

export function createRoute<T, V>(props: Props<T, V>) {
    switch (props.method) {
        case "POST":
        case "PATCH":
        case "PUT":
        case "DELETE":
            return <D>(
                body: typeof props.body,
            ): SWRResponse<D | undefined, Error | undefined> => {
                const fetcher: Fetcher<D | undefined, string> = (url: string) =>
                    fetch(url, {
                        method: props.method,
                        body: JSON.stringify(body),
                    }).then(res => res.json())
                return useSWR(
                    `${API_ROUTE}/${props.segments.join("/")}${
                        props.hash.length
                            ? `#${encodeURIComponent(props.hash)}`
                            : ""
                    }`,
                    fetcher,
                )
            }
        case "GET":
            return <D>(
                query: typeof props.query,
            ): SWRResponse<D | undefined, Error | undefined> => {
                const params = []
                const fetcher: Fetcher<D | undefined, string> = (url: string) =>
                    fetch(url, { method: props.method }).then(res => res.json())
                for (const [k, v] of Object.entries(query))
                    params.push(
                        [
                            encodeURIComponent(k),
                            encodeURIComponent(`${v}`),
                        ].join("="),
                    )
                return useSWR(
                    `${API_ROUTE}/${props.segments.join("/")}${
                        params.length ? `?${params.join("&")}` : ""
                    }${
                        props.hash.length
                            ? `#${encodeURIComponent(props.hash)}`
                            : ""
                    }`,
                    fetcher,
                )
            }
    }
}
