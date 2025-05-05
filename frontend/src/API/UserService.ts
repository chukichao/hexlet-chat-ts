import axios from 'axios';

export default class UserService {
  static async login(data) {
    const response = await axios.post('/api/v1/login', data);

    return response;
  }

  static async createNewUser(data) {
    const response = await axios.post('/api/v1/signup', data);

    return response;
  }
}
