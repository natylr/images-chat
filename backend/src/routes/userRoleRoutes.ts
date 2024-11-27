import { Router } from 'express';
import { createUserRole, getAllUserRoles, getUserRoleById, updateUserRoleById, deleteUserRoleById } from '../controllers/userRoleController';
import verifyJWTMiddleware from '../middleware/auth/verifyJWTverifyJWTMiddleware';
import { checkUserIdExistsMiddleware } from '../middleware/user/checkUserIdExistsMiddleware';
import { checkChatRoomIdExistsMiddleware } from '../middleware/chatRoom/checkChatRoomIdExistsMiddleware';

const router: Router = Router();

router.post('/userroles',verifyJWTMiddleware,checkUserIdExistsMiddleware, checkChatRoomIdExistsMiddleware, createUserRole);
router.get('/userroles',verifyJWTMiddleware, getAllUserRoles);
router.get('/userroles/:id',verifyJWTMiddleware, getUserRoleById);
router.put('/userroles/:id',verifyJWTMiddleware,checkUserIdExistsMiddleware, checkChatRoomIdExistsMiddleware, updateUserRoleById);
router.delete('/userroles/:id',verifyJWTMiddleware, deleteUserRoleById);

export default router;
