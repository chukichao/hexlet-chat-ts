import type { RootState } from "../";

// auth
export const getToken = (state: RootState) => state.auth.token;
export const getUsername = (state: RootState) => state.auth.username;

// ui
export const getCurrentChannelId = (state: RootState) =>
  state.ui.currentChannelId;
export const getDefaultChannelId = (state: RootState) =>
  state.ui.defaultChannelId;
export const getModal = (state: RootState) => state.ui.modal;

// channels
export const getChannels = (state: RootState) => state.channels.entities;

// messages
export const getMessages = (state: RootState) => state.messages.entities;
