import { Request, Response } from 'express';
import { Category } from '../models/category';

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
    try {
        const categoryData = { ...req.body, createdAt: new Date() }; 
        const newCategory = new Category(categoryData);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ message: 'Category name must be unique' });
        } else {
            res.status(500).json({ message: 'Server Error', error });
        }
    }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get a category by ID
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
