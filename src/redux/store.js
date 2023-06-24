import {configureStore} from "@reduxjs/toolkit";
import {foldersReducer} from "./reducers/folders";


export const store = configureStore({
    reducer: {
        folders: foldersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});