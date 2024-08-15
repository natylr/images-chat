import { Request, Response, NextFunction } from 'express';
import { IUserRole, UserRole } from '../models/userRole';
import { Permission } from '../models/permission';
import { IRole } from '../interfaces/IRole';
import { IPermission } from '../interfaces/IPermission';
import { Types } from 'mongoose';

// Define the populated user role interface
interface IUserRolePopulated extends Omit<IUserRole, 'role'> {
  role: IRolePopulated;
}

// Define the populated role interface
interface IRolePopulated extends Omit<IRole, 'permissions'> {
  permissions: Types.ObjectId[];
}

export const checkPermissions = (permissionName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { chatRoomId } = req.body;

    try {
      const userRoleDoc = await UserRole.findOne({ userID: userId, chatRoomID: chatRoomId }).populate('role');
      if (!userRoleDoc) {
        return res.status(403).json({ message: 'No role found for user in this chat room' });
      }

      // Assert the populated role field
      const userRole = userRoleDoc.toObject() as IUserRolePopulated;

      const permission = await Permission.findOne({ name: permissionName }) as IPermission;
      if (!permission) {
        return res.status(500).json({ message: 'Permission not found' });
      }

      const permissions = userRole.role.permissions as unknown as Types.ObjectId[];
      const permissionId = permission._id ;

      if (permissions && Array.isArray(permissions) && permissionId instanceof Types.ObjectId) {
        if (!permissions.includes(permissionId)) {
          return res.status(403).json({ message: 'Permission denied' });
        }
      } else {
        return res.status(403).json({ message: 'Permission denied' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Error checking permissions', error });
    }
  };
};