/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
    removeAuth(state) {
      state.token = null;
      state.username = null;
    },
  },
});

const { actions } = authSlice;
export { actions as authActions };

export default authSlice.reducer;
