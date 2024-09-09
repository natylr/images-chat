import {Router} from 'express'
import { createImage, getAllImages, getImageById, updateImageById, deleteImageById, getImagesByCategoryNameHandler } from '../controllers/imageController';

const router = Router();

router.post('/images', createImage);
router.get('/images', getAllImages);
router.get('/images/:id', getImageById);
router.put('/images/:id', updateImageById);
router.delete('/images/:id', deleteImageById);
router.get('/images/category/:categoryName', getImagesByCategoryNameHandler);

export default router;
