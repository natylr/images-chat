import { Request, Response } from 'express';
import { UserStatus, IUserStatus } from '../models/userStatus';

export const createUserStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const userStatus: IUserStatus = new UserStatus(req.body);
    await userStatus.save();
    res.status(201).send(userStatus);
  } catch (err) {
    res.status(400).send(err);
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
    const userStatus: IUserStatus | null = await UserStatus.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
