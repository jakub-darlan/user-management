import * as roles from '../models/roles';

const index = async (req, res, next) => {
  try {
    res.json(await roles.getAll());
  } catch (err) {
    console.error('Error while getting roles ', err.message);
    next(err);
  }
};

export default { index };
