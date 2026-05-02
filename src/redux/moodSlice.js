import { createSlice } from '@reduxjs/toolkit';

const savedEntries = JSON.parse(localStorage.getItem('mindmate_moods') || '[]');

const moodSlice = createSlice({
  name: 'mood',
  initialState: {
    entries: savedEntries,
  },
  reducers: {
    addMoodEntry: (state, action) => {
      state.entries.unshift(action.payload);
      localStorage.setItem('mindmate_moods', JSON.stringify(state.entries));
    },
  },
});

export const { addMoodEntry } = moodSlice.actions;
export default moodSlice.reducer;
