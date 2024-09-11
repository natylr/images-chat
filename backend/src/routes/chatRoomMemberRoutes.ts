import { Router } from 'express';
import { checkPermissions } from '../middleware/permissions/checkPermissions';
import { createChatRoomMember, getAllChatRoomMembers, getChatRoomMemberById, deleteChatRoomMemberById, leaveChatRoom } from '../controllers/chatRoomMemberController';
import verifyJWTMiddleware from '../middleware/auth/verifyJWTverifyJWTMiddleware ';
import verifyUserOwnsResource from '../middleware/auth/verifyUserOwnsResource'
const router: Router = Router();

router.post('/chatroommembers', verifyJWTMiddleware, createChatRoomMember);
router.get('/chatroommembers', verifyJWTMiddleware, getAllChatRoomMembers);
router.get('/chatroommembers/:id', verifyJWTMiddleware, getChatRoomMemberById);
router.delete('/chatroommembers/:id', verifyJWTMiddleware, checkPermissions('REMOVE_MEMBER'), deleteChatRoomMemberById);
router.post('/leaveChatRoom', verifyJWTMiddleware, checkPermissions('LEAVE_CHAT_ROOM', verifyUserOwnsResource), leaveChatRoom);

export default router;
