import express from 'express';
import usersController from '../controllers/users';

const router = express.Router();

router.route('/').get(usersController.index);
router.route('/:userId/groups').put(usersController.updateGroups); // TODO: probably better to nest controllers

export default router;
