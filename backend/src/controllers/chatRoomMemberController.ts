import { Request, Response } from 'express';
import { ChatRoomMember, IChatRoomMember } from '../models/chatRoomMember';

export const createChatRoomMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const chatRoomMember: IChatRoomMember = new ChatRoomMember(req.body);
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

export const updateChatRoomMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const chatRoomMember: IChatRoomMember | null = await ChatRoomMember.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!chatRoomMember) {
      res.status(404).send();
      return;
    }
    res.status(200).send(chatRoomMember);
  } catch (err) {
    res.status(400).send(err);
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
