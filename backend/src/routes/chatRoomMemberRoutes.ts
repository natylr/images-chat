import { Router } from 'express';
import { checkPermissions } from '../middleware/checkPermissions';
import { createChatRoomMember, getAllChatRoomMembers, getChatRoomMemberById, deleteChatRoomMemberById, leaveChatRoom } from '../controllers/chatRoomMemberController';
import verifyJWT from '../middleware/verifyJWT';
import verifyUserOwnsResource from '../middleware/verifyUserOwnsResource'
const router: Router = Router();

router.post('/chatroommembers', verifyJWT, createChatRoomMember);
router.get('/chatroommembers', verifyJWT, getAllChatRoomMembers);
router.get('/chatroommembers/:id', verifyJWT, getChatRoomMemberById);
router.delete('/chatroommembers/:id', verifyJWT, checkPermissions('REMOVE_MEMBER'), deleteChatRoomMemberById);
router.post('/leaveChatRoom', verifyJWT, checkPermissions('LEAVE_CHAT_ROOM', verifyUserOwnsResource), leaveChatRoom);

export default router;
