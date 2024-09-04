import { Request, Response } from 'express';
import { Image, IImage } from '../models/image';
import { NullImage } from '../models/nullImage';

// Create an image
export const createImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const imageData = { ...req.body, createAt: new Date() }; 
    const image: IImage = new Image(imageData);
    await image.save();
    res.status(201).send(image);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get all images
export const getAllImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const images: IImage[] = await Image.find();
    res.status(200).send(images);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get an image by ID
export const getImageById = async (req: Request, res: Response): Promise<void> => {
  try {
    let image: IImage | null = await Image.findById(req.params.id);
    if (!image) {
      image = new NullImage() as IImage;
    }
    res.status(200).send(image);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update an image by ID
export const updateImageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const image: IImage | null = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!image) {
      res.status(404).send();
      return;
    }
    res.status(200).send(image);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete an image by ID
export const deleteImageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const image: IImage | null = await Image.findByIdAndDelete(req.params.id);
    if (!image) {
      res.status(404).send();
      return;
    }
    res.status(200).send(image);
  } catch (err) {
    res.status(500).send(err);
  }
};
