import { connectToDatabase, disconnectFromDatabase } from '../utils/db';
import { Permission } from '../models/permission';

const seedPermissions = async () => {
  await connectToDatabase();

  const permissions = [
    { name: 'CREATE_MESSAGE', description: 'Permission to create a message in a chat room' },
    { name: 'EDIT_MESSAGE', description: 'Permission to edit a message in a chat room' },
    { name: 'DELETE_MESSAGE', description: 'Permission to delete a message in a chat room' },
    { name: 'ADD_MEMBER', description: 'Permission to add a member to a chat room' },
    { name: 'REMOVE_MEMBER', description: 'Permission to remove a member from a chat room' },
    { name: 'DELETE_CHATROOM', description: 'Permission to delete a chat room'},
    { name: 'LEAVE_CHAT_ROOM', description: 'Permission to leave a chat room' }
    // { name: 'CREATE_USER', description: 'Permission to create a user' },
    // { name: 'DELETE_USER', description: 'Permission to delete a user' },
    // { name: 'ADD_IMAGE', description: 'Permission to create a image' },
    // { name: 'DELETE_IMAGE', description: 'Permission to delete a image' },
  ];

  try {
    await Permission.insertMany(permissions);
    console.log('Permissions seeded successfully');
  } catch (error) {
    console.error('Error seeding permissions', error);
  } finally {
    await disconnectFromDatabase();
  }
};

seedPermissions();
