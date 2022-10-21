import Message from "../../models/Message";

export default interface MessageDao {
  createMessage(message: Message): Promise<Message>;
  findSentMessageByUserId(uid: string): Promise<Message[]>;
  findRecievedMessageByUserId(uid: string): Promise<Message[]>;
  deleteMessage(mid: string): Promise<any>;
  updateMessage(mid: string, message: Message): Promise<any>;
  findMessageOf2Users(uid1: string, uid2: string): Promise<Message[]>;
}
