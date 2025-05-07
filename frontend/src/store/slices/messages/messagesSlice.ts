import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MessagesService from '../../../API/MessagesService.js';
import normalizeData from '../../../utils/normalizeData.js';

import type { IAddMessage, IMessage } from '../../../types/message.js';

import type { INormalizeState } from '../../../types/normalizeState.js';

const initialState: INormalizeState<IMessage> = {
  entities: {},
  ids: [],
};

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (token: string) => {
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
  async (data: IAddMessage) => {
    try {
      const response = await MessagesService.addMessage(data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      if (action.payload) {
        const { entities, ids } = action.payload;
        state.entities = entities;
        state.ids = ids;
      }
    });
  },
});

const { actions } = messagesSlice;
export { actions as messagesActions };

export default messagesSlice.reducer;
