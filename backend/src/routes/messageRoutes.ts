import { Router } from 'express';
import { createMessage, getAllMessages, getMessageById, updateMessageById, deleteMessageById } from '../controllers/messageController';
import verifyJWTMiddleware from '../middleware/auth/verifyJWTverifyJWTMiddleware ';
import { checkPermissionsMiddleware } from '../middleware/permissions/checkPermissionsMiddleware';
import verifyUserOwnsResource from '../middleware/auth/verifyUserOwnsResource';

const router: Router = Router();

router.post('/messages', checkPermissionsMiddleware('CREATE_MESSAGE'), verifyJWTMiddleware, createMessage);
router.get('/messages', verifyJWTMiddleware, getAllMessages);
router.get('/messages/:id', verifyJWTMiddleware, getMessageById);
router.put('/messages/:id', verifyJWTMiddleware, checkPermissionsMiddleware('EDIT_MESSAGE', verifyUserOwnsResource), updateMessageById);
router.delete('/messages/:id', verifyJWTMiddleware, checkPermissionsMiddleware('DELETE_MESSAGE'), deleteMessageById);

export default router;