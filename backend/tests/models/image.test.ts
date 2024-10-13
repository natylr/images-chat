// image.test.ts
import mongoose, { Types } from 'mongoose';
import { Image, IImage } from '../../src/models/image'; // Adjust the path as needed
import { connect, disconnect, clear } from '../../src/utils/database/databaseManager';
import { Category } from '../../src/models/category';

beforeAll(async () => {
    await connect();
});

beforeEach(async () => {
    await clear();
});

afterAll(async () => {
    await disconnect();
});

describe('Image Model', () => {
    it('should create a new image', async () => {

        const categoryData = {
            name: 'Nature'
        };

        const category = new Category(categoryData);
        await category.save();
        
        const imageData: Partial<IImage> = {
            URL: 'https://example.com/image.jpg',
            category: category._id as Types.ObjectId,
        };

        const image = new Image(imageData);
        const savedImage = await image.save();

        expect(savedImage._id).toBeDefined();
        expect(savedImage.URL).toBe(imageData.URL);
        expect(savedImage.category).toEqual(imageData.category);
        expect(savedImage.createdAt).toBeDefined();
    });

    it('should not create an image with a duplicate URL', async () => {
        const imageData: Partial<IImage> = {
            URL: 'https://example.com/image.jpg',
            category: new mongoose.Types.ObjectId(),
        };

        const image1 = new Image(imageData);
        await image1.save();

        const image2 = new Image(imageData);

        await expect(image2.save()).rejects.toThrowError(/duplicate key/);
    });

    it('should require a category', async () => {
        const imageData: Partial<IImage> = {
            URL: 'https://example.com/image.jpg',
        };

        const image = new Image(imageData);

        await expect(image.save()).rejects.toThrowError(/validation failed/);
    });

    it('should set createdAt by default', async () => {
        const imageData: Partial<IImage> = {
            URL: 'https://example.com/image.jpg',
            category: new mongoose.Types.ObjectId(),
        };

        const image = new Image(imageData);
        const savedImage = await image.save();

        expect(savedImage.createdAt).toBeDefined();
    });
});
