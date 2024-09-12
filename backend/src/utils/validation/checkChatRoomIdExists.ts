import { ChatRoom } from "../../models/chatRoom";

export const checkChatRoomIdExists = async (chatRoom: string): Promise<boolean> => {
  const user = await ChatRoom.findById(chatRoom);
  return !!user;
};
