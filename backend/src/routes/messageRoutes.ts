import { Router } from 'express';
import { createMessage, getAllMessages, getMessageById, updateMessageById, deleteMessageById } from '../controllers/messageController';
import verifyJWT from '../middleware/verifyJWT';
import { checkPermissions } from '../middleware/checkPermissions';
import verifyUserOwnsResource from '../middleware/verifyUserOwnsResource';

const router: Router = Router();

router.post('/messages',checkPermissions('CREATE_MESSAGE'), verifyJWT, createMessage);
router.get('/messages',verifyJWT, getAllMessages);
router.get('/messages/:id',verifyJWT, getMessageById);
router.put('/messages/:id',checkPermissions('EDIT_MESSAGE', verifyUserOwnsResource) ,verifyJWT, updateMessageById);
router.delete('/messages/:id',checkPermissions('DELETE_MESSAGE'),verifyJWT, deleteMessageById);

export default router;