import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allCategoryResponse, allProductResponse, messageResponse, newProductRequest, searchProductRequest, searchProductResponse } from "../../types/api_types";

export const productAPI = createApi({
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        latestProducts: builder.query<allProductResponse,string>({
            query: ()=> "latest",
            providesTags: ["product"],
        }),
        allProducts: builder.query<allProductResponse,string>({
            query: (id)=> `admin-products?id=${id}`,
            providesTags: ["product"],
        }),
        allCategories: builder.query<allCategoryResponse,string>({
            query: ()=> `categories`,
            providesTags: ["product"],
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
            providesTags: ["product"],
        }), 
        createNewProducts: builder.mutation<messageResponse,newProductRequest>({
            query: ({id,formData})=> ({
                url: `new?id=${id}`,
                method: "post",
                body: formData,
            }),
            invalidatesTags: ["product"]
        }),
    })
});

export const {useLatestProductsQuery, useAllProductsQuery, useAllCategoriesQuery, useSearchProductsQuery, useCreateNewProductsMutation} = productAPI;