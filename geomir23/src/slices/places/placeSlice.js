import { createSlice } from "@reduxjs/toolkit";

export const placeSlice = createSlice({
    name: 'place',
    initialState: {
      places: [],
      place: [],
      page: 0,
      isLoading: false,
      add: true,
      image: "",
      authToken: "",
      error: "",
      placesCount : 0,
      canReset: false

    },
    reducers: {
        startLoadingPlaces: (state) => {
            state.isLoading = true;
        },
        setPlaces: (state, action) => {
            state.places = action.payload;
            state.isLoading = false
        },
        setPlace: (state, action) => {
            state.place = action.payload
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
        setPlacesCount: (state, action) => {
            state.placesCount = action.payload
        }
    },
  });
  
  export const {startLoadingPlaces, setPlaces, setPlace, setAdd, setError, setImage, setAuthToken, setPlacesCount} = placeSlice.actions;
  export const placeReducer = placeSlice.reducer;