import {Router} from 'express'
import { createImage, getAllImages, getImageById, updateImageById, deleteImageById, getImagesByCategoryNameHandler } from '../controllers/imageController';
import { checkCategoryIdExistsMiddleware } from '../middleware/category/checkCategoryIdExistsMiddleware';

const router = Router();

router.post('/images',checkCategoryIdExistsMiddleware, createImage);
router.get('/images', getAllImages);
router.get('/images/:id', getImageById);
router.put('/images/:id', checkCategoryIdExistsMiddleware, updateImageById);
router.delete('/images/:id', deleteImageById);
router.get('/images/category/:categoryName', getImagesByCategoryNameHandler);

export default router;
