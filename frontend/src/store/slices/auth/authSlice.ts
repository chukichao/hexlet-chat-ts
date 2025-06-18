import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  username: string | null;
  token: string | null;
}

const initialState: IAuthState = {
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<IAuthState>) {
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
