import * as users from '../models/users';

const index = async (req, res, next) => {
  try {
    res.json(await users.getAll());
  } catch (err) {
    console.error('Error while getting users ', err.message);
    next(err);
  }
};

const updateGroups = async (req, res, next) => {
  try {
    const result = await users.updateGroups(req.params.userId, req.body.groupIds);
    res.json({ message: 'Groups were updated' });
  } catch (err) {
    console.error('Error while updating groups', err.message);
    next(err);
  }
};

export default { index, updateGroups };
