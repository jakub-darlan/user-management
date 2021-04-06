import UsersTable from 'components/users/UsersTable';
import GroupsTable from 'components/groups/GroupsTable';

const routes = [
  {
    path: '/',
    name: 'UsersTable',
    component: UsersTable,

  },
  {
    path: '/groups',
    name: 'GroupsTable',
    component: GroupsTable,
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
