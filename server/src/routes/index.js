import express from 'express';

import userRoutes from './users';
import groupRoutes from './groups';
import rolesRoutes from './roles';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/roles', rolesRoutes);

export default router;
