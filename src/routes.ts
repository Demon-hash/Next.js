import { createRoute } from "./utils/router"

export const API_ROUTE = "/api"

export const useSearchCategories = createRoute({
    method: "GET",
    segments: ["categories"],
    query: { locale: "" },
    hash: "",
})

export const useGetPopularClothes = createRoute({
    method: "GET",
    segments: ["popular", "clothes"],
    query: { locale: "", limit: 0 },
    hash: "",
})

export const useGetPopularBrands = createRoute({
    method: "GET",
    segments: ["popular", "brands"],
    query: { locale: "" },
    hash: "",
})

export const useGetCartOrders = createRoute({
    method: "PATCH",
    segments: ["cart"],
    body: {},
    hash: "",
})
