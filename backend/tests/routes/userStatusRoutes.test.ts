import * as request from 'supertest';
import * as express from 'express';
import { Application } from 'express';
import { UserStatus } from '../../src/models/userStatus';
import mongoose from 'mongoose';
import userStatusRoutes from '../../src/routes/userStatusRoutes';

const app: Application = express();
app.use(express.json());
app.use(userStatusRoutes);

jest.mock('../../src/models/userStatus');
jest.mock('../../src/utils/validation/checkExistsInUser', () => ({
  checkExistsInUser: jest.fn().mockResolvedValue(true), // Assume user always exists
}));

describe('User Status API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /userstatuses', () => {
    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/userstatuses')
        .send({ userID: '', mediaUrl: '' }); // Missing fields

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('All fields (userID, mediaUrl) are required.');
    });

    it('should create a new user status if none exists', async () => {
      const userID = new mongoose.Types.ObjectId().toHexString();
      const mockSave = jest.fn().mockResolvedValue({
        userID,
        mediaUrl: 'http://example.com/media.png',
        updatedAt: new Date(),
      });

      (UserStatus as jest.Mocked<typeof UserStatus>).findOne = jest.fn().mockResolvedValue(null);
      (UserStatus as jest.Mocked<typeof UserStatus>).prototype.save = mockSave;

      const response = await request(app)
        .post('/userstatuses')
        .send({ userID, mediaUrl: 'http://example.com/media.png' });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User status created successfully.');
      expect(mockSave).toHaveBeenCalled();
    });

    it('should update an existing user status', async () => {
      const userID = new mongoose.Types.ObjectId().toHexString();
      const existingStatus = {
        userID,
        mediaUrl: 'http://example.com/old-media.png',
        updatedAt: new Date(),
        save: jest.fn().mockResolvedValue({}),
      };

      (UserStatus as jest.Mocked<typeof UserStatus>).findOne = jest.fn().mockResolvedValue(existingStatus);

      const response = await request(app)
        .post('/userstatuses')
        .send({ userID, mediaUrl: 'http://example.com/new-media.png' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User status updated successfully.');
      expect(existingStatus.save).toHaveBeenCalled();
    });
  });

  describe('PUT /userstatuses/:id', () => {
    it('should return 400 if required fields are missing when updating', async () => {
      const response = await request(app)
        .put(`/userstatuses/${new mongoose.Types.ObjectId().toHexString()}`)
        .send({ mediaUrl: '' }); // Missing mediaUrl

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('mediaUrl is required.');
    });

    it('should return 404 if user status is not found for update', async () => {
      (UserStatus as jest.Mocked<typeof UserStatus>).findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .put(`/userstatuses/${new mongoose.Types.ObjectId().toHexString()}`)
        .send({ mediaUrl: 'http://example.com/media.png' });

      expect(response.status).toBe(404);
    });

    it('should update user status if found', async () => {
      const mockUpdatedStatus = {
        userID: new mongoose.Types.ObjectId().toHexString(),
        mediaUrl: 'http://example.com/media.png',
        updatedAt: new Date(),
      };

      (UserStatus as jest.Mocked<typeof UserStatus>).findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedStatus);

      const response = await request(app)
        .put(`/userstatuses/${new mongoose.Types.ObjectId().toHexString()}`)
        .send({ mediaUrl: 'http://example.com/media.png' });

      expect(response.status).toBe(200);
      expect(response.body.mediaUrl).toBe(mockUpdatedStatus.mediaUrl);
    });
  });

  describe('GET /userstatuses/:id', () => {
    it('should return 404 if user status is not found', async () => {
      (UserStatus as jest.Mocked<typeof UserStatus>).findById = jest.fn().mockResolvedValue(null);

      const response = await request(app).get(`/userstatuses/${new mongoose.Types.ObjectId().toHexString()}`);

      expect(response.status).toBe(404);
    });

    it('should return a user status if found', async () => {
      const mockStatus = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        userID: new mongoose.Types.ObjectId().toHexString(),
        mediaUrl: 'http://example.com/media.png',
        updatedAt: new Date(),
      };

      (UserStatus as jest.Mocked<typeof UserStatus>).findById = jest.fn().mockResolvedValue(mockStatus);

      const response = await request(app).get(`/userstatuses/${mockStatus._id}`);

      expect(response.status).toBe(200);
      expect(response.body.mediaUrl).toBe(mockStatus.mediaUrl);
    });
  });
});
