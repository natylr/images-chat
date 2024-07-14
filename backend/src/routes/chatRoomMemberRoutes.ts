// chatRoomMemberRoutes.ts 
import { Router } from 'express';
import { createChatRoomMember, getAllChatRoomMembers, getChatRoomMemberById, updateChatRoomMemberById, deleteChatRoomMemberById } from '../controllers/chatRoomMemberController';

const router: Router = Router();

router.post('/chatroommembers', createChatRoomMember);
router.get('/chatroommembers', getAllChatRoomMembers);
router.get('/chatroommembers/:id', getChatRoomMemberById);
router.put('/chatroommembers/:id', updateChatRoomMemberById);
router.delete('/chatroommembers/:id', deleteChatRoomMemberById);

export default router;
