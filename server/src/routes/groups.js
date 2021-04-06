import express from 'express';
import groupsController from '../controllers/groups';

const router = express.Router();

router.route('/').get(groupsController.index);
router.route('/with-roles').get(groupsController.getWithRoles);
router.route('/:groupId/roles').put(groupsController.updateRoles);
router.route('/:groupId/roles').post(groupsController.addRole);

export default router;
