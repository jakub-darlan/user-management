import * as db from '../services/db';

const getAll = async () => {
    const rolesSql = `SELECT * FROM ar_types;` 
    const roles = await db.query(rolesSql);
    
    return roles;
}

export { getAll };