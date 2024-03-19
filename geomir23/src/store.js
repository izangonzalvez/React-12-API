import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authSlice'
import { reviewsReducer } from './places/reviews/reviewsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    review: reviewsReducer
  },
})