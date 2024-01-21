import {configureStore} from "@reduxjs/toolkit"
import { userApi } from "./api/userAPI";

export const backend = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (gDM) => gDM().concat(userApi.middleware),
});