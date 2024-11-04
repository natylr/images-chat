import { Category } from '../../src/models/category';
import { connect, disconnect, clear } from '../../src/utils/database/databaseManager';

beforeAll(async () => {
  await connect();
  await clear();
});

afterEach(async () => {
  await clear();
});

afterAll(async () => {
  await disconnect();
});

describe('Category Model', () => {
  it('should create a category successfully', async () => {
    const categoryData = {
      name: 'Nature',
      description: 'Images related to nature',
    };

    const newCategory = new Category(categoryData);
    await newCategory.save();

    const categoryInDb = await Category.findOne({ name: categoryData.name });
    expect(categoryInDb).toBeTruthy();
  });

  it('should not create a category without a name', async () => {
    const invalidCategoryData = {
      description: 'Category without a name',
    };

    try {
      const newCategory = new Category(invalidCategoryData);
      await newCategory.save();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('should not allow duplicate category names', async () => {
    const categoryData = {
      name: 'Nature',
      description: 'Images related to nature',
    };

    const firstCategory = new Category(categoryData);
    await firstCategory.save();

    const duplicateCategory = new Category(categoryData);
    await expect(duplicateCategory.save()).rejects.toThrow();
  });
});
