import { Message } from '../../src/models/message';
import { connect, disconnect, clear } from '../../src/utils/database/databaseManager';
import { User } from '../../src/models/user';
import { ChatRoom } from '../../src/models/chatRoom';
import { Image } from '../../src/models/image';
import { Category } from '../../src/models/category';
import { ChatRoomMember } from '../../src/models/chatRoomMember';

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clear();
});

afterAll(async () => {
  await disconnect();
});

describe('Message Model', () => {
  it('should create a message successfully', async () => {

    const userData = {
      username: 'user123',
      fname: 'Alice',
      lname: 'Smith',
      email: 'alice@example.com',
      phone: '9876543210',
      hashedPassword: 'hashedpassword789'
    };

    const user = new User(userData);
    await user.save();

    const chatRoomData = {
      name: 'Test Room156',
      primaryImageURL: 'http://example.com/image.png',
    };

    const chatRoom = new ChatRoom(chatRoomData);
    await chatRoom.save();

    const memberData = {
      userID: user._id,
      chatRoomID: chatRoom._id,
    };

    const chatRoomMember = new ChatRoomMember(memberData);
    await chatRoomMember.save();

    const categoryData = {
      name: 'Nature'
    };

    const category = new Category(categoryData);
    await category.save();

    const imageData = {
      URL: "http://example.com/image.png",
      category: category._id
    }
    const image = new Image(imageData);

    const messageData = {
      chatRoomMemberId: chatRoomMember._id,
      content: [image._id],
    };

    const newMessage = new Message(messageData);
    console.log(newMessage)
    await newMessage.save();

    const messageInDb = await Message.findOne({ content: messageData.content });
    expect(messageInDb).toBeTruthy();
    expect(messageInDb?.content).toEqual([image._id]);
  });

  it('should require a senderId and chatRoomId', async () => {
    const invalidMessageData = {
      content: 'This message lacks ids.',
    };

    try {
      const newMessage = new Message(invalidMessageData);
      await newMessage.save();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
