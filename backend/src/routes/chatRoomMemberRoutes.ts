// chatRoomMemberRoutes.ts 
import { Router } from 'express';
import { createChatRoomMember, getAllChatRoomMembers, getChatRoomMemberById, updateChatRoomMemberById, deleteChatRoomMemberById } from '../controllers/chatRoomMemberController';
import verifyJWT from '../middleware/verifyJWT';

const router: Router = Router();

router.post('/chatroommembers',verifyJWT, createChatRoomMember);
router.get('/chatroommembers',verifyJWT, getAllChatRoomMembers);
router.get('/chatroommembers/:id',verifyJWT, getChatRoomMemberById);
router.put('/chatroommembers/:id',verifyJWT, updateChatRoomMemberById);
router.delete('/chatroommembers/:id',verifyJWT, deleteChatRoomMemberById);

export default router;
