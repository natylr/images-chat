import { Router } from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory} from '../controllers/categoryController';

const router = Router();

router.post('/categories', createCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
