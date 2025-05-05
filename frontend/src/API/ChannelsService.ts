import axios from 'axios';

export default class ChannelsService {
  static async getChannels(token) {
    const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  static async addChannel(token, newChannel) {
    const response = await axios.post('/api/v1/channels', newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  static async removeChannel(token, channelId) {
    const response = await axios.delete(`/api/v1/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  static async editChannel(token, channelId, editedChannel) {
    const response = await axios.patch(
      `/api/v1/channels/${channelId}`,
      editedChannel,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  }
}
