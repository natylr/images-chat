import { Router } from 'express';
import { createChatRoom, getAllChatRooms, getChatRoomById, updateChatRoomById, deleteChatRoomById } from '../controllers/chatRoomController'
const router: Router = Router();

router.post('/chatrooms', createChatRoom);
router.get('/chatrooms', getAllChatRooms);
router.get('/chatrooms/:id', getChatRoomById);
router.put('/chatrooms/:id', updateChatRoomById);
router.delete('/chatrooms/:id', deleteChatRoomById);

export default router;

