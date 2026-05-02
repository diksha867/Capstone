import { createSlice } from '@reduxjs/toolkit';

const savedAuth = JSON.parse(localStorage.getItem('mindmate_auth') || 'null');

const initialState = savedAuth || {
  isAuthenticated: false,
  user: null,
  role: 'guest',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
      };
      state.role = 'user';
      localStorage.setItem('mindmate_auth', JSON.stringify(state));
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
      };
      state.role = 'user';
      localStorage.setItem('mindmate_auth', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = 'guest';
      localStorage.setItem('mindmate_auth', JSON.stringify(state));
    },
  },
});

export const { signupSuccess, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
