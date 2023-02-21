import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import userReducer from "./user/user.reducer";
import newEditionsReducer from "./newEditions/newEditions.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    newEditions: newEditionsReducer
})

const store = configureStore({
    reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store