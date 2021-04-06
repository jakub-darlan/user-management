import * as db from '../services/db';
import { allWithGroupsAndRolesSQL } from '../queries/user_queries';

const getAll = async () => {
  const usersRows = await db.query(allWithGroupsAndRolesSQL);

  const users = usersRows.reduce((acc, row) => {
    acc[row.id] = acc[row.id] || {
      ...row,
      groups: [],
    };
    acc[row.id].groups.push(row.group_id);
    return acc;
  }, {});
  return Object.values(users);
};

const updateGroups = async (userId, groupIds) => {
  const tableName = 'u_user_group';
  // czemu jest nuuuuuuuullllll/?//?///////////
  const items = groupIds.filter(x => x).map((groupId) => (
      {user_id: userId, group_id: groupId}
    )
  );

  return await db.updateJoinTable(tableName, items, 'user_id', 'group_id');
};

export { getAll, updateGroups };

