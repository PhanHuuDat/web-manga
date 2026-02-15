import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './slices/comment-slice';
import authReducer from './slices/auth-slice';

export const store = configureStore({
  reducer: {
    comments: commentReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
