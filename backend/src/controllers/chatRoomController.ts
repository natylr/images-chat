import { Request, Response } from 'express';
import { ChatRoom, IChatRoom } from '../models/chatRoom';

export const createChatRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const chatRoom: IChatRoom = new ChatRoom(req.body);
    await chatRoom.save();
    res.status(201).send(chatRoom);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getAllChatRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const chatRooms: IChatRoom[] = await ChatRoom.find();
    res.status(200).send(chatRooms);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getChatRoomById = async (req: Request, res: Response): Promise<void> => {
  try {
    const chatRoom: IChatRoom | null = await ChatRoom.findById(req.params.id);
    if (!chatRoom) {
      res.status(404).send();
      return;
    }
    res.status(200).send(chatRoom);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateChatRoomById = async (req: Request, res: Response): Promise<void> => {
  try {
    const chatRoom: IChatRoom | null = await ChatRoom.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!chatRoom) {
      res.status(404).send();
      return;
    }
    res.status(200).send(chatRoom);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteChatRoomById = async (req: Request, res: Response): Promise<void> => {
  try {
    const chatRoom: IChatRoom | null = await ChatRoom.findByIdAndDelete(req.params.id);
    if (!chatRoom) {
      res.status(404).send();
      return;
    }
    res.status(200).send(chatRoom);
  } catch (err) {
    res.status(500).send(err);
  }
};
