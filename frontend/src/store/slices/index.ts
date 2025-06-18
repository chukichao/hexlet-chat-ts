import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice.js";
import channelsReducer from "./channels/channelsSlice.js";
import messagesReducer from "./messages/messagesSlice.js";
import uiReducer from "./ui/uiSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  channels: channelsReducer,
  messages: messagesReducer,
});

export default rootReducer;
