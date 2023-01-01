import { createRoute } from "./utils/Router/router"

export const API_ROUTE = "/api"

export const useSearchCategories = createRoute({
    method: "GET",
    segments: ["search", "categories"],
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

export const useGetBannerSlides = createRoute({
    method: "GET",
    segments: ["banner", "slides"],
    query: {},
    hash: "",
})

export const getWomenCategoriesTable = createRoute({
    method: "GET",
    segments: ["categories", "women"],
    query: {},
    hash: "",
})

export const getMenCategoriesTable = createRoute({
    method: "GET",
    segments: ["categories", "men"],
    query: {},
    hash: "",
})

export const useGetCartOrders = createRoute({
    method: "PATCH",
    segments: ["cart"],
    body: {},
    hash: "",
})
