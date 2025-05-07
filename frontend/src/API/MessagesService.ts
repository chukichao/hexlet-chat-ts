import axios from 'axios';

import type { IAddMessage } from '../types/message';

export default class MessagesService {
  static async getMessages(token: string) {
    const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  static async addMessage({ token, newMessage }: IAddMessage) {
    const response = await axios.post('/api/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }
}
