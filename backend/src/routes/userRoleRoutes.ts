import { Router } from 'express';
import { createUserRole, getAllUserRoles, getUserRoleById, updateUserRoleById, deleteUserRoleById } from '../controllers/userRoleController';
import verifyJWT from '../middleware/verifyJWT';

const router: Router = Router();

router.post('/userroles',verifyJWT, createUserRole);
router.get('/userroles',verifyJWT, getAllUserRoles);
router.get('/userroles/:id',verifyJWT, getUserRoleById);
router.put('/userroles/:id',verifyJWT, updateUserRoleById);
router.delete('/userroles/:id',verifyJWT, deleteUserRoleById);

export default router;
