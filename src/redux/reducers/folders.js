import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    folders: [],
    pagesInfo: {
        pagesCount: 0,
        currentPage: 0,
        perPage: 0
    },
    isFetching: false
};

const foldersSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        setFolders: (state, action) => {
            state.folders =  action.payload.folders;
            state.pagesInfo = {
                pagesCount: action.payload.pagesCount,
                perPage: action.payload.perPage
            };
        },
        setCurrentPage: (state, action) => {
            state.folders.currentPage = action.payload.currentPage;
        },
        setIsFetching: (state, action) => {
            state.isFetching = action.payload.isFetching;
        }
    }
});

export const foldersReducer = foldersSlice.reducer;
export const foldersActions = foldersSlice.actions;

export const foldersSelectors = {
    getFolders: (state) => state.folders.folders,
    getPagesInfo: (state) => state.folders.pagesInfo,
    isFetching: (state) => state.folders.isFetching,
};