import { User } from '../../src/models/user';
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

describe('User Model', () => {
  it('should create a user successfully', async () => {
    const userData = {
      username: 'testuser',
      fname: 'Test',
      lname: 'User',
      email: 'testuser@example.com',
      phone: '0545848484',
      hashedPassword: 'hashedpassword123',
    };

    const newUser = new User(userData);
    let res= await newUser.save();
    
    const userInDb = await User.findOne({ email: userData.email });
    expect(userInDb).toBeTruthy();
    expect(userInDb?.username).toBe('testuser');
  });

  it('should not create a user without required fields', async () => {
    const invalidUserData = {
      fname: 'Test',
    };

    try {
      const newUser = new User(invalidUserData);
      await newUser.save();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('should not allow duplicate email addresses', async () => {
    const userData = {
      username: 'testuser',
      fname: 'Test',
      lname: 'User',
      email: 'testuser@example.com',
      phone: '0545848484',
      hashedPassword: 'hashedpassword123',
    };

    const newUser = new User(userData);
    await newUser.save();

    const duplicateUser = new User(userData);

    await expect(duplicateUser.save()).rejects.toThrow();
  });
});
