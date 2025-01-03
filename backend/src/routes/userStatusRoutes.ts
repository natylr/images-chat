import { Router } from 'express';
import { createOrUpdateUserStatus, getAllUserStatuses, getUserStatusById, updateUserStatusById, deleteUserStatusById } from '../controllers/userStatusController';
import { checkUserIdExistsMiddleware } from '../middleware/user/checkUserIdExistsMiddleware';
import { validateUserStatus } from '../middleware/userStatus/validateUserStatus';

const router: Router = Router();

router.post('/userstatuses', validateUserStatus, checkUserIdExistsMiddleware, createOrUpdateUserStatus);
router.get('/userstatuses', getAllUserStatuses);
router.get('/userstatuses/:id', getUserStatusById);
router.put('/userstatuses/:id', validateUserStatus, updateUserStatusById);
router.delete('/userstatuses/:id', deleteUserStatusById);

export default router;
