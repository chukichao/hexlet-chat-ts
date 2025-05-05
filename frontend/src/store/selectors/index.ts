// auth
export const getToken = (state) => state.auth.token;
export const getUsername = (state) => state.auth.username;

// ui
export const getCurrentChannelId = (state) => state.ui.currentChannelId;
export const getDefaultChannelId = (state) => state.ui.defaultChannelId;
export const getModal = (state) => state.ui.modal;

// channels
export const getChannels = (state) => state.channels.entities;

// messages
export const getMessages = (state) => state.messages.entities;
