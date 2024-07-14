import { Request, Response } from 'express';
import { UserRole, IUserRole } from '../models/userRole';

export const createUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRole: IUserRole = new UserRole(req.body);
    await userRole.save();
    res.status(201).send(userRole);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getAllUserRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRoles: IUserRole[] = await UserRole.find();
    res.status(200).send(userRoles);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getUserRoleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRole: IUserRole | null = await UserRole.findById(req.params.id);
    if (!userRole) {
      res.status(404).send();
      return;
    }
    res.status(200).send(userRole);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateUserRoleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRole: IUserRole | null = await UserRole.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!userRole) {
      res.status(404).send();
      return;
    }
    res.status(200).send(userRole);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteUserRoleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRole: IUserRole | null = await UserRole.findByIdAndDelete(req.params.id);
    if (!userRole) {
      res.status(404).send();
      return;
    }
    res.status(200).send(userRole);
  } catch (err) {
    res.status(500).send(err);
  }
};
