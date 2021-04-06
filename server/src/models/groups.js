import * as db from '../services/db';

const attributes = [
  'id', 'group_id', 'type_id', 'visible', 'read', 'write', 'enabled', 'object_id'
]

const getAll = async () => {
  const groupsSql = 'SELECT * FROM u_groups;';
  const groups = await db.query(groupsSql);

  return groups;
};

const getAllWithRoles = async () => {
  const groupsSql = `SELECT groups.*, ar_data.enabled, ar_data.visible,
    ar_data.read, ar_data.write, ar_data.object_id, ar_data.id AS ar_data_id, ar_types.id AS type_id,
    ar_types.name AS role_name
    FROM u_groups AS groups
    JOIN ar_data ON ar_data.group_id = groups.id
    JOIN ar_types ON ar_types.id = ar_data.type_id;`;
  const groupsRows = await db.query(groupsSql);

  const groups = groupsRows.reduce((acc, row) => {
    acc[row.id] = acc[row.id] || {
      ...row,
      roles: [],
    };
    const item = {
      type_id: row.type_id,
      ar_data_id: row.ar_data_id,
      name: row.role_name,
      visible: !!row.visible,
      enabled: !!row.enabled,
      read: !!row.read,
      write: !!row.write,
      object_id: row.object_id,
    };
    acc[row.id].roles.push(item);
    return acc;
  }, {});
  return Object.values(groups);
};

const addRole = async (groupId, role) => {
  const tableName = 'ar_data';

  return await db.insert(tableName, [_serialize({ group_id: groupId, ...role })])
}

const updateRoles = async (groupId, roles) => {
  const tableName = 'ar_data';
  const items = roles.map((role) => (_serialize({ id: role.ar_data_id, group_id: groupId, ...role})));
  await db.withTransaction(_updateAndDeleteRoles, tableName, items);
};

const _updateAndDeleteRoles = async (tableName, items, connection) => {
  const itemsIds = items.map(item => item.id);
  const deleteSql = `DELETE FROM ${tableName}
                     WHERE group_id = ${items[0].group_id} AND id NOT IN (?);`;

  for(let item of items) {
    await db.update(tableName, item, connection)
  };
  await db.query(deleteSql, [itemsIds], connection);
}
// const _insertAndUpdateRoles = async(tableName, updatedItems, items, connection) => {
//   const itemKey = 'group_id';
//   const associationKey = 'type_id';
//   await db.updateJoinTable(tableName, items, itemKey, associationKey, false, connection);
//   for(let item of updatedItems) {
//     await db.update(tableName, item, connection)
//   };
// }

const _serialize = (item) => {
  const itemEntity = {};
  attributes.forEach(attr => {
    const value = item[attr] ? +item[attr] : item[attr]
    return itemEntity[attr] = value;
  });
  return itemEntity
}

export { getAll, getAllWithRoles, updateRoles, addRole };
