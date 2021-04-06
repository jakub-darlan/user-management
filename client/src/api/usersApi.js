import { api } from 'boot/axios';

const baseUrl = '/users';

export default {
  async getAll() {
    const res = await api.get(baseUrl);
    return res.data;
  },
  async updateGroups(userId, groups) {
    const res = await api.put(`${baseUrl}/${userId}/groups`, {
      groupIds: groups,
    });
    return res.data;
  },
};
