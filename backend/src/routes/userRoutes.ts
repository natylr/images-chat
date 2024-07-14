import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById, isUsernameAvailable, loginUser } from '../controllers/userController';
import { checkUsernameExistsMiddleware } from '../middleware/checkUsernameExistsMiddleware';
const router = Router();

router.post('/users', checkUsernameExistsMiddleware, createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);
router.get('/check-username-availability', isUsernameAvailable)
router.post('/login', loginUser);

export default router;
