import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allProductResponse } from "../../types/api_types";

export const productAPI = createApi({
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    endpoints: (builder) => ({
        latestProducts: builder.query<allProductResponse,string>({
            query: ()=> "latest"
        }),
        allProducts: builder.query<allProductResponse,string>({
            query: (id)=> `admin-products?id=${id}`,
        }),
    })
});

export const {useLatestProductsQuery, useAllProductsQuery} = productAPI;