import {createRoute} from "./utils/router";
import {ICategories} from "./types/categories";

export const API_ROUTE = "/api";

export const useSearchCategories = createRoute({
    method: "GET",
    segments: ["categories"],
    query: {locale: ""},
    hash: ""
});

export const GET_POPULAR_CLOTHES = createRoute({
    method: "POST",
    segments: ["popular", "clothes"],
    body: {limit: 6},
    hash: ""
});

export const GET_CART_ORDERS = createRoute({
    method: "PATCH",
    segments: ["cart"],
    body: {},
    hash: ""
});