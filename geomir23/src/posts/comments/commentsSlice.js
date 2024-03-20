import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice ({
    name: "comment",
    initialState: { 
        comments: [],
        page: 0,
        isLoading: false,
        add: true,
        error: "",
        commentsCount : 0
    },
    reducers: {
        startLoadingComments: (state) => {
            state.isLoading = true;
        },
        setComments: (state, action ) => {
            state.comments = action.payload
            state.isLoading = false
        },
        setAdd: (state, action ) => {
            state.add = action.payload
        },
        setError: (state,action) => {
            state.error = action.payload
        },
        setCommentsCount: (state, action) => {
            state.commentsCount = action.payload
        }
    }
});

export const {startLoadingComments, setComments, setAdd, setError, setCommentsCount} = commentSlice.actions;
export const commentReducer = commentSlice.reducer