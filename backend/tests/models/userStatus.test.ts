import { UserStatus } from '../../src/models/userStatus';
import { connect, disconnect, clear } from '../../src/utils/database/databaseManager';
import { User } from '../../src/models/user';

const userData = {
    username: 'testuser',
    fname: 'Test',
    lname: 'User',
    email: 'testuser@example.com',
    phone: '0545848484',
    hashedPassword: 'hashedpassword123',
};

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clear();
});

afterAll(async () => {
    await disconnect();
});

describe('UserStatus Model Test', () => {

    it('should create a UserStatus successfully', async () => {
        const user = new User(userData);
        const userID = user._id;
        await user.save();
        const userStatus = new UserStatus({
            userID,
            mediaUrl: 'http://example.com/media.jpg',
        });

        const savedStatus = await userStatus.save();
        expect(savedStatus._id).toBeDefined();
        expect(savedStatus.userID).toEqual(userID);
        expect(savedStatus.mediaUrl).toBe('http://example.com/media.jpg');
        expect(savedStatus.updatedAt).toBeInstanceOf(Date);
    });

    it('should not create a UserStatus without a userID', async () => {
        const userStatus = new UserStatus({
            mediaUrl: 'http://example.com/media.jpg',
        });

        let err: any;
        try {
            await userStatus.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.userID).toBeDefined();
        expect(err.errors.userID.kind).toBe('required');
    });

    it('should not create a UserStatus without a mediaUrl', async () => {
        const user = new User(userData);
        const userID = user._id;
        await user.save();
        const userStatus = new UserStatus({
            userID,
        });

        let err: any;
        try {
            await userStatus.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.mediaUrl).toBeDefined();
        expect(err.errors.mediaUrl.kind).toBe('required');
    });

    it('should update a UserStatus successfully', async () => {
        const user = new User(userData);
        const userID = user._id;
        await user.save();
        const userStatus = new UserStatus({
            userID,
            mediaUrl: 'http://example.com/media.jpg',
        });

        const savedStatus = await userStatus.save();
        savedStatus.mediaUrl = 'http://example.com/updated-media.jpg';
        const updatedStatus = await savedStatus.save();

        expect(updatedStatus.mediaUrl).toBe('http://example.com/updated-media.jpg');
    });

});