import { api } from 'boot/axios';

export default {
  async getAll() {
    const res = await api.get('/roles');
    return res.data;
  },
};
