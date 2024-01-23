import {configureStore} from "@reduxjs/toolkit"
import { userApi } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";

export const backend = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [userReducer.name]: userReducer.reducer,
    },
    middleware: (gDM) => gDM().concat(userApi.middleware),
});