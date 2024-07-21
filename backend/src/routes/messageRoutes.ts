import { Router } from 'express';
import { createMessage, getAllMessages, getMessageById, updateMessageById, deleteMessageById } from '../controllers/messageController';
import verifyJWT from '../middleware/verifyJWT';

const router: Router = Router();

router.post('/messages',verifyJWT, createMessage);
router.get('/messages',verifyJWT, getAllMessages);
router.get('/messages/:id',verifyJWT, getMessageById);
router.put('/messages/:id',verifyJWT, updateMessageById);
router.delete('/messages/:id',verifyJWT, deleteMessageById);

export default router;