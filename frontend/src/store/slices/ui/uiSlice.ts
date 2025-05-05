/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { addChannel, removeChannel } from '../../asyncActions';

const defaultChannelId = '1';

const initialState = {
  modal: {
    isOpened: false,
    type: null,
    extra: null,
  },
  defaultChannelId,
  currentChannelId: defaultChannelId,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel(state, action) {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
    openModal(state, action) {
      const { type, extra = null } = action.payload;
      state.modal.isOpened = true;
      state.modal.type = type;
      state.modal.extra = extra;
    },
    closeModal(state) {
      state.modal.isOpened = false;
      state.modal.type = null;
      state.modal.extra = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addChannel.fulfilled, (state, action) => {
      const { id } = action.payload;
      state.currentChannelId = id;
    });
    builder.addCase(removeChannel.fulfilled, (state) => {
      state.currentChannelId = state.defaultChannelId;
    });
  },
});

const { actions } = uiSlice;
export { actions as uiActions };

export default uiSlice.reducer;
