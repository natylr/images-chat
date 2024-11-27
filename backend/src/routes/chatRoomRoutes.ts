import { Router } from 'express';
import { createChatRoom, getAllChatRooms, getChatRoomById, updateChatRoomById, deleteChatRoomById } from '../controllers/chatRoomController'
import verifyJWTMiddleware from '../middleware/auth/verifyJWTverifyJWTMiddleware';
import { checkPermissionsMiddleware } from '../middleware/permissions/checkPermissionsMiddleware';
const router: Router = Router();

router.post('/chatrooms',verifyJWTMiddleware, createChatRoom);
router.get('/chatrooms',verifyJWTMiddleware, getAllChatRooms);
router.get('/chatrooms/:id',verifyJWTMiddleware, getChatRoomById);
router.put('/chatrooms/:id',verifyJWTMiddleware, checkPermissionsMiddleware("UPDATE_CHATROOM"), updateChatRoomById);
router.delete('/chatrooms/:id',verifyJWTMiddleware, checkPermissionsMiddleware("DELETE_CHATROOM"), deleteChatRoomById);

export default router;

