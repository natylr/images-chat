import { Request, Response } from 'express';
import { UserStatus, IUserStatus } from '../models/userStatus';

export const createOrUpdateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userID, mediaUrl } = req.body;

    // Check if a status already exists for the user
    const existingStatus = await UserStatus.findOne({ userID });

    if (existingStatus) {
      // Update the existing status
      existingStatus.mediaUrl = mediaUrl;
      existingStatus.updatedAt = new Date();
      await existingStatus.save();

      return res.status(200).json({ message: 'User status updated successfully.' });
    } else {
      // Create a new status
      const newUserStatus = new UserStatus({
        userID,
        mediaUrl,
      });

      await newUserStatus.save();
      return res.status(201).json({ message: 'User status created successfully.' });
    }
  } catch (error) {
    console.error('Error in createOrUpdateUserStatus:', error);
    return res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
};

export const getAllUserStatuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const userStatuses: IUserStatus[] = await UserStatus.find();
    res.status(200).send(userStatuses);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getUserStatusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userStatus: IUserStatus | null = await UserStatus.findById(req.params.id);
    if (!userStatus) {
      res.status(404).send();
      return;
    }
    res.status(200).send(userStatus);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateUserStatusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userStatusData = { ...req.body, updatedAt: new Date() }
    const userStatus: IUserStatus | null = await UserStatus.findByIdAndUpdate(req.params.id, userStatusData, { new: true, runValidators: true });
    if (!userStatus) {
      res.status(404).send();
      return;
    }
    res.status(200).send(userStatus);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteUserStatusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userStatus: IUserStatus | null = await UserStatus.findByIdAndDelete(req.params.id);
    if (!userStatus) {
      res.status(404).send();
      return;
    }
    res.status(200).send(userStatus);
  } catch (err) {
    res.status(500).send(err);
  }
};
