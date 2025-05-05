import axios from 'axios';

export default class MessagesService {
  static async getMessages(token) {
    const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  static async addMessage(token, newMessage) {
    const response = await axios.post('/api/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }
}
