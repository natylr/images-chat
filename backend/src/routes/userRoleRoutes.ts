import { Router } from 'express';
import { createUserRole, getAllUserRoles, getUserRoleById, updateUserRoleById, deleteUserRoleById } from '../controllers/userRoleController';
import verifyJWTMiddleware from '../middleware/auth/verifyJWTverifyJWTMiddleware ';

const router: Router = Router();

router.post('/userroles',verifyJWTMiddleware, createUserRole);
router.get('/userroles',verifyJWTMiddleware, getAllUserRoles);
router.get('/userroles/:id',verifyJWTMiddleware, getUserRoleById);
router.put('/userroles/:id',verifyJWTMiddleware, updateUserRoleById);
router.delete('/userroles/:id',verifyJWTMiddleware, deleteUserRoleById);

export default router;
