import { Request, Response } from 'express';
import { Message, IMessage } from '../models/message';

export const createMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const messageData = { ...req.body, timeStamp: new Date() }; 
    const message: IMessage = new Message(messageData);
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages: IMessage[] = await Message.find().populate('userID chatRoomID');
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getMessageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const message: IMessage | null = await Message.findById(req.params.id).populate('userID chatRoomID');
    if (!message) {
      res.status(404).send();
      return;
    }
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateMessageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData = { ...req.body, timeStamp: new Date() }; 
    const message: IMessage | null = await Message.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!message) {
      res.status(404).send();
      return;
    }
    res.status(200).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteMessageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const message: IMessage | null = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404).send();
      return;
    }
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};
