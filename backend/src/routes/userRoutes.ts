import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById, isUsernameAvailable, loginUser } from '../controllers/userController';
import { isUsernameAvailableMiddleware } from '../middleware/user/isUsernameAvailableMiddleware';
import verifyJWTMiddleware from '../middleware/auth/verifyJWTverifyJWTMiddleware ';
const router = Router();

router.post('/users', isUsernameAvailableMiddleware, createUser);
router.get('/users',verifyJWTMiddleware, getAllUsers);
router.get('/users/:id',verifyJWTMiddleware, getUserById);
router.put('/users/:id',verifyJWTMiddleware, updateUserById);
router.delete('/users/:id',verifyJWTMiddleware, deleteUserById);
router.get('/check-username-availability',verifyJWTMiddleware, isUsernameAvailable)
router.post('/login', loginUser);

export default router;
