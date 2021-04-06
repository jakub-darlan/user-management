// const allWithGroupsAndRolesSQL =
//     `SELECT users.*,
//     group_concat(distinct groups.name) AS groups_names,
//     group_concat(distinct roles.name) AS roles_names
//     FROM users
//     LEFT JOIN u_user_group AS ug ON users.id = ug.user_id
//     LEFT JOIN u_groups AS groups ON ug.group_id = groups.id
//     LEFT JOIN ar_data ON groups.id = ar_data.group_id
//     LEFT JOIN ar_types AS roles ON ar_data.type_id = roles.id
//     group by users.username;`

const allWithGroupsAndRolesSQL = `SELECT users.*, 
    groups.id as group_id
    FROM users 
    LEFT JOIN u_user_group AS ug ON users.id = ug.user_id
    LEFT JOIN u_groups AS groups ON ug.group_id = groups.id;`;

export { allWithGroupsAndRolesSQL };
