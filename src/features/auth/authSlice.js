import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

const initialState = {
  token: localStorage.getItem('token') || null,
  user: getInitialUser(),
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token ?? null;
      if (payload.user) {
        localStorage.setItem('user', JSON.stringify(payload.user));
      } else {
        localStorage.removeItem('user');
      }
      if (payload.token) {
        localStorage.setItem('token', payload.token);
      } else {
        localStorage.removeItem('token');
      }
    },
    loggedOut(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setLoading(state, { payload }) {
      state.loading = Boolean(payload);
    },
  },
});

export const { setCredentials, loggedOut, setLoading } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => Boolean(state.auth.user);
export const selectAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;
