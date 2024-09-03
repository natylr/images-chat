import { Router } from 'express';
import { createChatRoom, getAllChatRooms, getChatRoomById, updateChatRoomById, deleteChatRoomById } from '../controllers/chatRoomController'
import verifyJWT from '../middleware/verifyJWT';
import { checkPermissions } from '../middleware/checkPermissions';
const router: Router = Router();

router.post('/chatrooms',verifyJWT, createChatRoom);
router.get('/chatrooms',verifyJWT, getAllChatRooms);
router.get('/chatrooms/:id',verifyJWT, getChatRoomById);
router.put('/chatrooms/:id',verifyJWT, checkPermissions("UPDATE_CHATROOM"), updateChatRoomById);
router.delete('/chatrooms/:id',verifyJWT, checkPermissions("DELETE_CHATROOM"), deleteChatRoomById);

export default router;

