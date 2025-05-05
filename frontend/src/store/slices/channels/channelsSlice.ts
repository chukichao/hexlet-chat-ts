/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ChannelsService from '../../../API/ChannelsService.js';
import normalizeData from '../../../utils/normalizeData.js';

export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (token) => {
    try {
      const response = await ChannelsService.getChannels(token);

      return normalizeData(response.data);
    } catch (error) {
      console.error(error);
    }
  },
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ token, newChannel }) => {
    try {
      const response = await ChannelsService.addChannel(token, newChannel);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ token, channelId }) => {
    try {
      const response = await ChannelsService.removeChannel(token, channelId);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
);

export const editChannel = createAsyncThunk(
  'channels/editChannel',
  async ({ token, channelId, editedChannel }) => {
    try {
      const response = await ChannelsService.editChannel(
        token,
        channelId,
        editedChannel,
      );

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

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getChannels.fulfilled, (state, action) => {
      const { entities, ids } = action.payload;
      state.entities = entities;
      state.ids = ids;
    });
  },
});

const { actions } = channelsSlice;
export { actions as channelsActions };

export default channelsSlice.reducer;
