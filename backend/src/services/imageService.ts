import { Image, IImage } from '../models/image';
import { Category } from '../models/category';

export const getImagesByCategoryName = async (categoryName: string): Promise<IImage[]> => {
  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    throw new Error('Category not found');
  }
  return Image.find({ category: category._id });
};
