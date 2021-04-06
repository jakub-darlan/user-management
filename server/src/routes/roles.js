import express from 'express';
import rolesController from '../controllers/roles';

const router = express.Router();

router.route('/').get(rolesController.index);

export default router;
