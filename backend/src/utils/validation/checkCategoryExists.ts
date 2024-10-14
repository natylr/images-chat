import { Category } from "../../models/category";

export const checkCategoryExists = async (categoryId) => {
  return await Category.exists({ _id: categoryId });
};