<template>
    <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="row">
        <div class="col-5">
          <q-select standout v-model="newRole" :options="options" label="Role name" map-options />
        </div>
        <div class='col-2'>
          <q-btn label="Add" color="primary" @click="addRole"></q-btn>
        </div>
      </div>
      <div v-for="role in rolesData" :key="role.name">
        <div class="row">
          <div class="col">
            <q-checkbox v-model="role.checked" :label="role.name" />
          </div>
          <template v-if="role.checked">
            <div class="col">
              <q-checkbox v-model="role.visible" label="Visible" />
            </div>
            <div class="col">
              <q-checkbox v-model="role.enabled" label="Enabled" />
            </div>
            <div class="col">
              <q-checkbox v-model="role.read" label="Read" />
            </div>
            <div class="col">
              <q-checkbox v-model="role.write" label="Write" />
            </div>
            <div class="col">
              <q-input standout v-model="role.object_id" label="Object Id" />
            </div>
          </template>
        </div>
      </div>
      <div>
          <q-btn label="Save" type="submit" color="primary"></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import groupsApi from '../../api/groupsApi';
import { notifySuccess, notifyError } from '../../utils/notifier';

export default {
  name: 'RolesChoicesForm',
  props: ['groupId', 'roles', 'availableRoles'],
  data() {
    return {
      rolesData: [],
      newRole: { label: '' },
      options: [],
      choosedRoles: [],
      emptyRole: {
        visible: false, enabled: false, read: false, write: false, object_id: -1,
      },
    };
  },
  methods: {
    async addRole() {
      const role = {
        type_id: this.newRole.value, name: this.newRole.label, ...this.emptyRole, checked: true,
      };
      try {
        const res = await groupsApi.addRole(this.groupId, role);
        this.rolesData.unshift({ id: res.id, ...role });
      } catch (err) {
        notifyError(err.message);
      }
    },
    updatedRoles() {
      return this.rolesData.filter((r) => r.checked);
    },
    async onSubmit() {
      try {
        const res = await groupsApi.updateRoles(this.groupId, this.updatedRoles());
        notifySuccess(res.message);
      } catch (err) {
        notifyError(err.message);
      }
    },
  },
  mounted() {
    this.choosedRoles = this.roles;
    this.options = this.availableRoles.map((role) => ({ value: role.id, label: role.name }));
    this.rolesData = this.roles.map((role) => ({ ...role, checked: true }));
  },
};
</script>
