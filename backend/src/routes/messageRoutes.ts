import { Router } from 'express';
import { createMessage, getAllMessages, getMessageById, updateMessageById, deleteMessageById } from '../controllers/messageController';

const router: Router = Router();

router.post('/messages', createMessage);
router.get('/messages', getAllMessages);
router.get('/messages/:id', getMessageById);
router.put('/messages/:id', updateMessageById);
router.delete('/messages/:id', deleteMessageById);

export default router;