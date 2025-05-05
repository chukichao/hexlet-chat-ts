/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MessagesService from '../../../API/MessagesService.js';
import normalizeData from '../../../utils/normalizeData.js';

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (token) => {
    try {
      const response = await MessagesService.getMessages(token);

      return normalizeData(response.data);
    } catch (error) {
      console.error(error);
    }
  },
);

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ token, newMessage }) => {
    try {
      const response = await MessagesService.addMessage(token, newMessage);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
);

const initialState = {
  entities: {},
  ids: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      const { entities, ids } = action.payload;
      state.entities = entities;
      state.ids = ids;
    });
  },
});

const { actions } = messagesSlice;
export { actions as messagesActions };

export default messagesSlice.reducer;
