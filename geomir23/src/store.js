import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authSlice'
import { commentReducer } from './posts/comments/commentsSlice'
import { reviewsReducer } from './places/reviews/reviewsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comment: commentReducer,
    review: reviewsReducer
  },
})