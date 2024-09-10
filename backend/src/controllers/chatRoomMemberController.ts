import { Request, Response } from 'express';
import { ChatRoomMember, IChatRoomMember } from '../models/chatRoomMember';

export const createChatRoomMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const chatRoomMemberData = { ...req.body, joinedAt: new Date() }; 
    const chatRoomMember: IChatRoomMember = new ChatRoomMember(chatRoomMemberData);
    await chatRoomMember.save();
    res.status(201).send(chatRoomMember);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getAllChatRoomMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const chatRoomMembers: IChatRoomMember[] = await ChatRoomMember.find();
    res.status(200).send(chatRoomMembers);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getChatRoomMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const chatRoomMember: IChatRoomMember | null = await ChatRoomMember.findById(req.params.id);
    if (!chatRoomMember) {
      res.status(404).send();
      return;
    }
    res.status(200).send(chatRoomMember);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteChatRoomMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const chatRoomMember: IChatRoomMember | null = await ChatRoomMember.findByIdAndDelete(req.params.id);
    if (!chatRoomMember) {
      res.status(404).send();
      return;
    }
    res.status(200).send(chatRoomMember);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const leaveChatRoom = async (req: Request, res: Response) => {
  const { chatRoomId } = req.body;
  const userId = req.body.user._id; // Assuming you have user ID available in request

  try {
    const result = await ChatRoomMember.findOneAndDelete({ chatRoomID: chatRoomId, userID: userId });
    if (!result) {
      return res.status(404).json({ message: 'User not found in chat room' });
    }
    res.status(200).json({ message: 'Successfully left the chat room' });
  } catch (error) {
    res.status(500).json({ message: 'Error leaving the chat room', error });
  }
};