<template>
    <div class="q-pa-md">
        <q-table
        title="Users"
        :data="users"
        :columns="columns"
        row-key="username"
        :loading="loading"
        :filter="search"
        >
        <template v-slot:top>
      <div style="width: 100%" class="row justify-between">
        <div class="col-3">
          Users
        </div>
        <div class="col-3">
          <q-input  dense debounce="400" color="primary" v-model="search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
    </template>
        <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm"
                color="primary" round dense @click="props.expand = !props.expand"
                :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" style="white-space: wrap">
              <groups-choices-form
                v-bind:userId="props.row.id"
                v-bind:groups="props.row.groups"
                v-bind:availableGroups="availableGroups"
                ></groups-choices-form>

          </q-td>
        </q-tr>
      </template>
      </q-table>
  </div>
</template>

<script>
import usersApi from '../../api/usersApi';
import groupsApi from '../../api/groupsApi';
import GroupsChoicesForm from './GroupsChoicesForm';

export default {
  name: 'UsersTable',
  components: {
    'groups-choices-form': GroupsChoicesForm,
  },

  data() {
    return {
      loading: true,
      search: '',
      columns: [
        {
          name: 'firstname',
          required: true,
          label: 'FirstName',
          align: 'left',
          field: 'firstname',
        },
        {
          name: 'lastname', label: 'Last Name', field: 'lastname',
        },
        {
          name: 'username', label: 'User Name', field: 'username',
        },
        { name: 'userlabel', label: 'User Label', field: 'userlabel' },
      ],
      users: [],
      availableGroups: [],
    };
  },

  methods: {
    prepareAvailableGroupsOptions() {
      this.availableGroups = this.availableGroups.map((group) => ({
        label: group.name, value: group.id,
      }));
    },
  },

  async mounted() {
    const users = await usersApi.getAll();
    const availableGroups = await groupsApi.getAll();
    this.$set(this, 'users', users);
    this.$set(this, 'availableGroups', availableGroups);
    this.prepareAvailableGroupsOptions();

    this.$set(this, 'loading', false);
  },
};
</script>
