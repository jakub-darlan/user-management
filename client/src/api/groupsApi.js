import { api } from 'boot/axios';

export default {
  async getAll() {
    const res = await api.get('/groups');
    return res.data;
  },
  async getAllWithRoles() {
    const res = await api.get('/groups/with-roles');
    return res.data;
  },
  async updateRoles(groupId, roles) {
    const res = await api.put(`/groups/${groupId}/roles`, {
      roles,
    });
    return res.data;
  },
  async addRole(groupId, role) {
    const res = await api.post(`/groups/${groupId}/roles`, {
      role,
    });
    return res.data;
  },
};
