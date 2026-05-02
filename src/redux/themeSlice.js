import { createSlice } from '@reduxjs/toolkit';

const savedTheme = localStorage.getItem('mindmate_theme') || 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: savedTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mindmate_theme', state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
