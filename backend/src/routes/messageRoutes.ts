import { Router } from 'express';
import { createMessage, getAllMessages, getMessageById, updateMessageById, deleteMessageById } from '../controllers/messageController';
import verifyJWT from '../middleware/verifyJWT';
import { checkPermissions } from '../middleware/checkPermissions';
import verifyUserOwnsResource from '../middleware/verifyUserOwnsResource';

const router: Router = Router();

router.post('/messages', checkPermissions('CREATE_MESSAGE'), verifyJWT, createMessage);
router.get('/messages', verifyJWT, getAllMessages);
router.get('/messages/:id', verifyJWT, getMessageById);
router.put('/messages/:id', verifyJWT, checkPermissions('EDIT_MESSAGE', verifyUserOwnsResource), updateMessageById);
router.delete('/messages/:id', verifyJWT, checkPermissions('DELETE_MESSAGE'), deleteMessageById);

export default router;