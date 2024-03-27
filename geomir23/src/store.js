import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authSlice'
import { commentReducer } from './posts/comments/commentsSlice'
import { reviewsReducer } from './places/reviews/reviewsSlice'
import { postReducer } from './slices/posts/postSlice'
import { placeReducer } from './slices/places/placeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comment: commentReducer,
    review: reviewsReducer,
    post: postReducer,
    place: placeReducer
  },
})