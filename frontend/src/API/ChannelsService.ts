import axios from "axios";

import type {
  IAddChannel,
  IRemoveChannel,
  IEditChannel,
} from "../types/channel";

export default class ChannelsService {
  static async getChannels(token: string) {
    const response = await axios.get("/api/v1/channels", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  static async addChannel({ token, newChannel }: IAddChannel) {
    const response = await axios.post("/api/v1/channels", newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  static async removeChannel({ token, channelId }: IRemoveChannel) {
    const response = await axios.delete(`/api/v1/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  static async editChannel({ token, channelId, editedChannel }: IEditChannel) {
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
