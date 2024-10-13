import mongoose from 'mongoose';
import { Permission } from '../../src/models/permission';
import { connect, disconnect, clear } from '../../src/utils/database/databaseManager';

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clear();
});

afterAll(async () => {
  await disconnect();
});

describe('Permission Model', () => {
  it('should create a permission successfully', async () => {
    const permissionData = {
      name: 'manage_users',
      description: 'Can manage users in the system',
    };

    const newPermission = new Permission(permissionData);
    await newPermission.save();

    const permissionInDb = await Permission.findOne({ name: permissionData.name });
    expect(permissionInDb).toBeTruthy();
    expect(permissionInDb?.description).toBe('Can manage users in the system');
  });

  it('should require a name for permission', async () => {
    const invalidPermissionData = {
      description: 'Missing name',
    };

    try {
      const newPermission = new Permission(invalidPermissionData);
      await newPermission.save();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
