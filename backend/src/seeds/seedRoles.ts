import { connectToDatabase, disconnectFromDatabase } from '../utils/db';
import { Role } from '../models/role';
import { Permission } from '../models/permission';

const seedRoles = async () => {
  await connectToDatabase();

  try {
    const permissions = await Permission.find();

    const permissionMap = permissions.reduce((map, permission) => {
      map[permission.name] = permission._id;
      return map;
    }, {});

    const userPermissions = [
      permissionMap['CREATE_MESSAGE'],
      permissionMap['EDIT_MESSAGE'],
      permissionMap['DELETE_MESSAGE'],
      permissionMap['LEAVE_CHAT_ROOM'],
    ].filter(Boolean);

    const adminPermissions = [
      ...userPermissions,
      permissionMap['ADD_MEMBER'],
      permissionMap['REMOVE_MEMBER'],
      permissionMap['DELETE_CHATROOM'],
    ].filter(Boolean);

    const roles = [
      {
        name: 'Admin',
        permissions: adminPermissions,
        description: 'Administrator role with all permissions',
      },
      {
        name: 'User',
        permissions: userPermissions,
        description: 'Regular member with limited permissions',
      }
    ];

    await Role.insertMany(roles);
    console.log('Roles seeded successfully');
  } catch (error) {
    console.error('Error seeding roles', error);
  } finally {
    await disconnectFromDatabase();
  }
};

seedRoles();
