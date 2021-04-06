import * as groups from '../models/groups';

const index = async (req, res, next) => {
  try {
    res.json(await groups.getAll());
  } catch (err) {
    console.error('Error while getting groups ', err.message);
    next(err);
  }
};

const getWithRoles = async (req, res, next) => {
  try {
    res.json(await groups.getAllWithRoles());
  } catch (err) {
    console.error('Error while getting groups ', err.message);
    next(err);
  }
};

const updateRoles = async (req, res, next) => {
  try {
    const result = await groups.updateRoles(req.params.groupId, req.body.roles);
    res.json({ message: 'Roles were updated' });
  } catch (err) {
    console.error('Error while updating roles', err.message);
    next(err);
  }
};

const addRole = async (req, res, next) => {
  try {
    const result = await groups.addRole(req.params.groupId, req.body.role);
    res.json({ id: result });
  } catch (err) {
    console.error('Error while saving role', err.message);
    next(err);
  }
};

export default { index, getWithRoles, updateRoles, addRole };
