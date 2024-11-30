import { Category } from "../../models/category";

export const checkCategoryExists = async (categoryId: string) => {
  return await Category.exists({ _id: categoryId });
};
