import { configureStore } from '@reduxjs/toolkit'
import deckReducer from '@src/redux/slices/deckSlice'

export const store = configureStore({
  reducer: { deck: deckReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
