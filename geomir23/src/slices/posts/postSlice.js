import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: 'post',
    initialState: {
      posts: [],
      post: [],
      page: 0,
      isLoading: true,
      add: false,
      image: "",
      authToken: "",
      error: "",
      postsCount : 0,
      canReset: false

    },
    reducers: {
        startLoadingPosts: (state) => {
            state.isLoading = true;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.isLoading = false
        },
        setPost: (state, action) => {
            state.post = action.payload
            state.isLoading = false
        },
        setAdd: (state, action ) => {
            state.add = action.payload
        },
        setError: (state,action) => {
            state.error = action.payload
        },
        setImage: (state, action) => {
            state.image = action.payload
        },
        setAuthToken: (state, action) => {
            state.authToken = action.payload
        },
        setPostsCount: (state, action) => {
            state.postsCount = action.payload
        }
    },
  });
  
  export const {startLoadingPosts, setPosts, setPost, setAdd, setError, setImage, setAuthToken, setPostsCount} = postSlice.actions;
  export const postReducer = postSlice.reducer;