import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { productAPI } from "./api/productAPI";
import { cartReducer } from "./reducer/cartReducer";
import { orderAPI } from "./api/orderAPI";
import { dashboardAPI } from "./api/dashboardAPI";

export const backend = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [dashboardAPI.reducerPath]: dashboardAPI.reducer
    },
    middleware: (gDM) => gDM().concat(userApi.middleware, productAPI.middleware, orderAPI.middleware, dashboardAPI.middleware),
});