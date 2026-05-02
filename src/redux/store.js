import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import moodReducer from './moodSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mood: moodReducer,
    theme: themeReducer,
  },
});
