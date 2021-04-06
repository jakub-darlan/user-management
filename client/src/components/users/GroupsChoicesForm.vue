<template>
    <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
        <q-option-group
        :options="options"
        label="Groups"
        type="checkbox"
        v-model="groups"
        inline
        />
        <div>
            <q-btn label="Save" type="submit" color="primary"></q-btn>
        </div>
    </q-form>
  </div>
</template>

<script>
import userApi from '../../api/usersApi';
import { notifySuccess, notifyError } from '../../utils/notifier';

export default {
  name: 'GroupChoicesForm',
  props: ['userId', 'groups', 'availableGroups'],
  data() {
    return {
      options: [],
      choosedGroups: [],
    };
  },
  methods: {
    async onSubmit() {
      try {
        const result = await userApi.updateGroups(this.userId, this.groups);
        notifySuccess(result.message);
      } catch (err) {
        notifyError(err.message);
      }
    },
  },
  mounted() {
    this.choosedGroups = this.groups;
    this.options = this.availableGroups;
  },
};
</script>
