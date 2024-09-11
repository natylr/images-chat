import { Router } from 'express';
import { createMessage, getAllMessages, getMessageById, updateMessageById, deleteMessageById } from '../controllers/messageController';
import verifyJWTMiddleware from '../middleware/auth/verifyJWTverifyJWTMiddleware ';
import { checkPermissions } from '../middleware/permissions/checkPermissions';
import verifyUserOwnsResource from '../middleware/auth/verifyUserOwnsResource';

const router: Router = Router();

router.post('/messages', checkPermissions('CREATE_MESSAGE'), verifyJWTMiddleware, createMessage);
router.get('/messages', verifyJWTMiddleware, getAllMessages);
router.get('/messages/:id', verifyJWTMiddleware, getMessageById);
router.put('/messages/:id', verifyJWTMiddleware, checkPermissions('EDIT_MESSAGE', verifyUserOwnsResource), updateMessageById);
router.delete('/messages/:id', verifyJWTMiddleware, checkPermissions('DELETE_MESSAGE'), deleteMessageById);

export default router;