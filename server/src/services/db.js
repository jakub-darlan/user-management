import mysql from 'mysql2';
import dbConfig from '../config/db.config.js';

const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

const query = async (sql, params, conn = promisePool) => {
  const [result,] = await conn.query(sql, params);

  return result;
};

const update = async(tableName, item, conn = promisePool) => {
  const setStatement = _prepareKeyValueAttr(item);
  const updateSql = `UPDATE ${tableName} SET ${setStatement} WHERE id = ${item.id}`;
  
  return await conn.execute(updateSql);
};

const insert = async(tableName, items, conn = promisePool) => {
  const itemsArray = Array.isArray(items) ? items : [items];
  const keys = Object.keys(itemsArray[0]).map(key => _escapeReservedKey(key));
  const insertSql = `INSERT INTO ${tableName}(${keys.join(',')}) VALUES ? `;
  const values = itemsArray.map((item) => (Object.values(item)));

  const [result,] = await conn.query(insertSql, [values]);
  return result.insertId;
};

const _prepareKeyValueAttr = (item) => (
  Object.keys(item)
    .filter((key) => key != 'id')
    .map((key) => `${_escapeReservedKey(key)}=${mysql.escape(item[key])}`)
    .join(',')
);

const _escapeReservedKey = (key) => (`\`${key}\``);

const updateJoinTable = async (tableName, items, itemKeyName, associationKeyName, inTransaction = true, conn = promisePool) => {
  if(!inTransaction) {
    await _updateWithoutTransaction(tableName, items, itemKeyName, associationKeyName, conn);
  } else {
    await withTransaction(_updateWithoutTransaction, tableName, items, itemKeyName, associationKeyName);
  };
};

const _updateWithoutTransaction = async (tableName, items, itemKeyName, associationKeyName, conn = promisePool) => {
    const itemValue = items[0][itemKeyName];
  const keys = items.map((item) => Object.values(item));
  const selectSql = `SELECT ${associationKeyName} FROM ${tableName} WHERE ${itemKeyName} = ${itemValue}`
  const deleteSql = `DELETE FROM ${tableName}
                     WHERE ${associationKeyName} NOT IN (${associationValues.join(',')})
                     AND ${itemKeyName} IN (${itemValue});`

  
  const newItems = items.filter((val) => !existingAssociations.flat(1).includes(val[associationKeyName]));
  await conn.execute(deleteSql);
  if(newItems.length) {
    insert(tableName, newItems);
  }
};

const _uniqueIds = async (tableName, items) => {
  const keys = Object.keys(items)[0];
  const values = items.map(item => Object.values(items));
  const selectSql = `SELECT id, ${associationKeyName} FROM ${tableName} WHERE ${itemKeyName} = ${itemValue}`

  const [existingAssociations,] = await conn.query({sql: selectSql, rowsAsArray: true});

  const newItems = items.filter((val) => (existingAssociations.includes(val[associationKeyName])));
};

const withTransaction = async function(callback, ...args) {
  const connection = await promisePool.getConnection();
  await connection.beginTransaction();
  try {
    await callback(...args, connection);
    await connection.commit();
  } catch (err) {
    console.log(err)
    console.log(`Error occured during db transaction: ${err}`);
    connection.rollback;
    throw err;
  } finally {
    pool.releaseConnection(connection);
  }
};

export { query, insert, update, updateJoinTable, withTransaction };
