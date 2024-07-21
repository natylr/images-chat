import { Router } from 'express';
import { createChatRoom, getAllChatRooms, getChatRoomById, updateChatRoomById, deleteChatRoomById } from '../controllers/chatRoomController'
import verifyJWT from '../middleware/verifyJWT';
const router: Router = Router();

router.post('/chatrooms',verifyJWT, createChatRoom);
router.get('/chatrooms',verifyJWT, getAllChatRooms);
router.get('/chatrooms/:id',verifyJWT, getChatRoomById);
router.put('/chatrooms/:id',verifyJWT, updateChatRoomById);
router.delete('/chatrooms/:id',verifyJWT, deleteChatRoomById);

export default router;

