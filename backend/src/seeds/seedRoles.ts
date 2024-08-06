import { connectToDatabase, disconnectFromDatabase } from '../utils/db';
import { Role } from '../models/role';
import { Permission } from '../models/permission';

const seedRoles = async () => {
  await connectToDatabase();

  const permissions = await Permission.find();
  const leaveChatRoomPermission = permissions.find(p => p.name === 'LEAVE_CHAT_ROOM');
  const createMassagePermission = permissions.find(p => p.name === 'CREATE_MESSAGE');

  const roles = [
    {
      name: 'Admin',
      permissions: permissions.map(p => p._id), 
      description: 'Administrator role with all permissions',
    },
    {
      name: 'User',
      permissions: [createMassagePermission?._id, leaveChatRoomPermission?._id],
      description: 'Regular member with limited permissions',
    }
  ];

  try {
    await Role.insertMany(roles);
    console.log('Roles seeded successfully');
  } catch (error) {
    console.error('Error seeding roles', error);
  } finally {
    await disconnectFromDatabase();
  }
};

seedRoles();
