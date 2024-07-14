import { Router } from 'express';
import { createUserRole, getAllUserRoles, getUserRoleById, updateUserRoleById, deleteUserRoleById } from '../controllers/userRoleController';

const router: Router = Router();

router.post('/userroles', createUserRole);
router.get('/userroles', getAllUserRoles);
router.get('/userroles/:id', getUserRoleById);
router.put('/userroles/:id', updateUserRoleById);
router.delete('/userroles/:id', deleteUserRoleById);

export default router;
