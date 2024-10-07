import { ChatRoom } from '../../src/models/chatRoom';
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

describe('ChatRoom Model', () => {
  it('should create a chat room successfully', async () => {
    const chatRoomData = {
      name: 'Test Room',
      primaryImageURL: 'http://example.com/image.png', 
    };

    const newChatRoom = new ChatRoom(chatRoomData);
    let req = await newChatRoom.save();
    
    const chatRoomInDb = await ChatRoom.findOne({ name: chatRoomData.name });
    expect(chatRoomInDb).toBeTruthy();
    expect(chatRoomInDb?.primaryImageURL).toBe(chatRoomData.primaryImageURL); 
  });

  it('should not create a chat room without a name', async () => {
    const invalidChatRoomData = {
      primaryImageURL: 'http://example.com/image.png',  
    };

    try {
      const newChatRoom = new ChatRoom(invalidChatRoomData);
      await newChatRoom.save();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
