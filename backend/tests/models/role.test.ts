import mongoose from 'mongoose';
import { Role } from '../../src/models/role';
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

describe('Role Model', () => {
  it('should create a role successfully', async () => {
    const roleData = {
      name: 'admin',
    };

    const newRole = new Role(roleData);
    await newRole.save();

    const roleInDb = await Role.findOne({ name: roleData.name });
    expect(roleInDb).toBeTruthy();
    expect(roleInDb?.name).toBe('admin');
  });

  it('should require a role name', async () => {
    const invalidRoleData = {};

    try {
      const newRole = new Role(invalidRoleData);
      await newRole.save();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
