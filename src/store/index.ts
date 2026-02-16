import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './slices/comment-slice';
import authReducer from './slices/auth-slice';
import mangaReducer from './slices/manga-slice';
import chapterReducer from './slices/chapter-slice';
import genreReducer from './slices/genre-slice';
import bookmarkReducer from './slices/bookmark-slice';
import readingHistoryReducer from './slices/reading-history-slice';

export const store = configureStore({
  reducer: {
    comments: commentReducer,
    auth: authReducer,
    manga: mangaReducer,
    chapter: chapterReducer,
    genre: genreReducer,
    bookmark: bookmarkReducer,
    readingHistory: readingHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
