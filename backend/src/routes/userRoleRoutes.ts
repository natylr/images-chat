import { Router } from 'express';
import { createUserRole, getAllUserRoles, getUserRoleById, updateUserRoleById, deleteUserRoleById } from '../controllers/userRoleController';
import verifyJWTMiddleware from '../middleware/auth/verifyJWTverifyJWTMiddleware ';
import { checkUserIdExistsMiddleware } from '../middleware/user/checkUserIdExistsMiddleware';

const router: Router = Router();

router.post('/userroles',verifyJWTMiddleware,checkUserIdExistsMiddleware, createUserRole);
router.get('/userroles',verifyJWTMiddleware, getAllUserRoles);
router.get('/userroles/:id',verifyJWTMiddleware, getUserRoleById);
router.put('/userroles/:id',verifyJWTMiddleware,checkUserIdExistsMiddleware, updateUserRoleById);
router.delete('/userroles/:id',verifyJWTMiddleware, deleteUserRoleById);

export default router;
