import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ChannelsService from '../../../API/ChannelsService.js';
import normalizeData from '../../../utils/normalizeData.js';

import type {
  IChannel,
  IAddChannel,
  IRemoveChannel,
  IEditChannel,
} from '../../../types/channel.js';

import type { INormalizeState } from '../../../types/normalizeState.js';

const initialState: INormalizeState<IChannel> = {
  entities: {},
  ids: [],
};

export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (token: string) => {
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
  async (data: IAddChannel) => {
    try {
      const response = await ChannelsService.addChannel(data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (data: IRemoveChannel) => {
    try {
      const response = await ChannelsService.removeChannel(data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
);

export const editChannel = createAsyncThunk(
  'channels/editChannel',
  async (data: IEditChannel) => {
    try {
      const response = await ChannelsService.editChannel(data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannels.fulfilled, (state, action) => {
      if (action.payload) {
        const { entities, ids } = action.payload;
        state.entities = entities;
        state.ids = ids;
      }
    });
  },
});

const { actions } = channelsSlice;
export { actions as channelsActions };

export default channelsSlice.reducer;
