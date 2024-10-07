import mongoose from 'mongoose';
import { ChatRoomMember } from '../../src/models/chatRoomMember';
import { ChatRoom } from '../../src/models/chatRoom'; 
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

describe('ChatRoomMember Model', () => {
  it('should add a member to a chat room', async () => {
    
    // Create a valid chat room 
    const chatRoomData = {
        name: 'Test Room1',
        primaryImageURL: 'http://example.com/image.png', 
      };

    const chatRoom = new ChatRoom(chatRoomData);
    await chatRoom.save();

    // Create a valid user
    const userData = {
        username: 'testuser1',
        fname: 'Test',
        lname: 'User',
        email: 'testuser@example.com',
        phone: '0545848484',
        hashedPassword: 'hashedpassword123',
      };

    const user = new User(userData);
    await user.save(); 
    
    const memberData = {
      userID: user._id, // Use the ID of the created user
      chatRoomID: chatRoom._id, // Use the ID of the created chat room
    };

    const newMember = new ChatRoomMember(memberData);
    await newMember.save();
    
    const memberInDb = await ChatRoomMember.findOne({ userID: memberData.userID });
    expect(memberInDb).toBeTruthy();
    expect(memberInDb?.userID).toEqual(memberData.userID);
    expect(memberInDb?.chatRoomID).toEqual(memberData.chatRoomID);
  });

  it('should require a userID and chatRoomID', async () => {
    const invalidMemberData = {
      // Missing userID and chatRoomID
    };

    try {
      const newMember = new ChatRoomMember(invalidMemberData);
      await newMember.save();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
