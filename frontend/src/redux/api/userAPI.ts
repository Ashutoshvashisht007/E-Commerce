import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { messageResponse } from "../../types/api_types";
import { User } from "../../types/types";

export const userApi = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user`}),
    endpoints: (builder) => ({
        login: builder.mutation<messageResponse,User>({
            query: (user)=> ({
                url: "new",
                method: "POST",
                body: user,
            })
        }),
    }),
});

export const {useLoginMutation} = userApi;