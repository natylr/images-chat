// chatRoomMemberRoutes.ts 
import { Router } from 'express';
import { checkPermissions } from '../middleware/checkPermissions';
import { createChatRoomMember, getAllChatRoomMembers, getChatRoomMemberById, updateChatRoomMemberById, deleteChatRoomMemberById, leaveChatRoom } from '../controllers/chatRoomMemberController';
import verifyJWT from '../middleware/verifyJWT';

const router: Router = Router();

router.post('/chatroommembers',verifyJWT, createChatRoomMember);
router.get('/chatroommembers',verifyJWT, getAllChatRoomMembers);
router.get('/chatroommembers/:id',verifyJWT, getChatRoomMemberById);
router.put('/chatroommembers/:id',verifyJWT, updateChatRoomMemberById);
router.delete('/chatroommembers/:id',verifyJWT, deleteChatRoomMemberById);
router.post('/leaveChatRoom',verifyJWT, checkPermissions('LEAVE_CHAT_ROOM'), leaveChatRoom);

export default router;
