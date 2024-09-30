import { Router } from 'express';
import { createOrUpdateUserStatus, getAllUserStatuses, getUserStatusById, updateUserStatusById, deleteUserStatusById } from '../controllers/userStatusController';
import { checkUserIdExistsMiddleware } from '../middleware/user/checkUserIdExistsMiddleware';

const router: Router = Router();

router.post('/userstatuses', checkUserIdExistsMiddleware, createOrUpdateUserStatus);
router.get('/userstatuses', getAllUserStatuses);
router.get('/userstatuses/:id', getUserStatusById);
router.put('/userstatuses/:id', updateUserStatusById);
router.delete('/userstatuses/:id', deleteUserStatusById);

export default router;
