import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById, isUsernameAvailable, loginUser } from '../controllers/userController';
import { isUsernameAvailableMiddleware } from '../middleware/user/isUsernameAvailableMiddleware';
import verifyJWT from '../middleware/verifyJWT';
const router = Router();

router.post('/users', isUsernameAvailableMiddleware, createUser);
router.get('/users',verifyJWT, getAllUsers);
router.get('/users/:id',verifyJWT, getUserById);
router.put('/users/:id',verifyJWT, updateUserById);
router.delete('/users/:id',verifyJWT, deleteUserById);
router.get('/check-username-availability',verifyJWT, isUsernameAvailable)
router.post('/login', loginUser);

export default router;
