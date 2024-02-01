import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dashboardStatsResponse } from "../../types/api_types";


export const dashboardAPI = createApi({
    reducerPath: "dashboardAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
    }),
    endpoints: (builder) => ({
        dashboardStats: builder.query<dashboardStatsResponse,string>({
            query: (id)=> `stats?id=${id}`,
        }),
        dashboardPie: builder.query<dashboardStatsResponse,string>({
            query: (id)=> `pie?id=${id}`,
        }),
        dashboardBar: builder.query<dashboardStatsResponse,string>({
            query: (id)=> `bar?id=${id}`,
        }),
        dashboardLine: builder.query<dashboardStatsResponse,string>({
            query: (id)=> `line?id=${id}`,
        }),
    })

});

export const {useDashboardStatsQuery, useDashboardBarQuery, useDashboardLineQuery, useDashboardPieQuery} = dashboardAPI;