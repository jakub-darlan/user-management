<template>
    <div class="q-pa-md">
        <q-table
        title="Groups"
        :data="groups"
        :columns="columns"
        row-key="name"
        :loading="loading"
        :filter="search"
        >
        <template v-slot:top>
      <div style="width: 100%" class="row justify-between">
        <div class="col-3">
          Groups
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
              <roles-choices-form
                v-bind:groupId="props.row.id"
                v-bind:roles="props.row.roles"
                v-bind:availableRoles="availableRoles"
                ></roles-choices-form>

          </q-td>
        </q-tr>
      </template>
      </q-table>
  </div>
</template>

<script>
import groupsApi from '../../api/groupsApi';
import rolesApi from '../../api/rolesApi';
import RolesChoicesForm from './RolesChoicesForm';

export default {
  name: 'GroupsTable',
  components: {
    'roles-choices-form': RolesChoicesForm,
  },

  data() {
    return {
      loading: true,
      search: '',
      columns: [
        {
          name: 'Name',
          required: true,
          label: 'Name',
          field: 'name',
          align: 'left',
        },
      ],
      groups: [],
      availableRoles: [],
    };
  },

  methods: {
    prepareavailableRolesOptions() {
      this.availableRoles = this.availableRoles.map((role) => ({
        label: role.name, value: role.id,
      }));
    },
  },

  async mounted() {
    const groups = await groupsApi.getAllWithRoles();
    const availableRoles = await rolesApi.getAll();
    this.$set(this, 'groups', groups);
    this.$set(this, 'availableRoles', availableRoles);
    // this.prepareavailableRolesOptions();

    this.$set(this, 'loading', false);
  },
};
</script>
