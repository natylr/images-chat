import {Router} from 'express'
import { createImage, getAllImages, getImageById, updateImageById, deleteImageById } from '../controllers/imageController';

const router = Router();

router.post('/images', createImage);
router.get('/images', getAllImages);
router.get('/images/:id', getImageById);
router.put('/images/:id', updateImageById);
router.delete('/images/:id', deleteImageById);

export default router;
