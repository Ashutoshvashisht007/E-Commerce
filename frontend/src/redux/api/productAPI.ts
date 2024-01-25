import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allCategoryResponse, allProductResponse, searchProductRequest, searchProductResponse } from "../../types/api_types";

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
        allCategories: builder.query<allCategoryResponse,string>({
            query: ()=> `categories`,
        }),
        searchProducts: builder.query<searchProductResponse,searchProductRequest>({
            query: ({search, sort, page, price, category})=> {
                
                let base = `all?search=${search}&page=${page}`;

                if(price)
                {
                    base += `&price=${price}`;
                }
                if(sort)
                {
                    base += `&sort=${sort}`;
                }
                if(category)
                {
                    base += `&category=${category}`;
                }

                return base;
            },
        }), 
    })
});

export const {useLatestProductsQuery, useAllProductsQuery, useAllCategoriesQuery, useSearchProductsQuery} = productAPI;