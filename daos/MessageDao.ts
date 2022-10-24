/**
 * @file message Dao for implementing CRUD operations
 */
import Message from "../models/Message";
import MessageModel from "../mongoose/message/MessageModel";
import MessageDaoI from "../interfaces/message/MessageDao";

/**
 * @class MessageDao implements MessageDaoI
 * @property {MessageDao} MessageDao Singleton DAO implementing message CRUD operation
 */
export default class MessageDao implements MessageDaoI {
  private static MessageDao: MessageDao | null = null;

  /**
   * Create singleton MessageDao instance
   * @returns MessageDao
   */
  public static getInstance = (): MessageDao => {
    if (MessageDao.MessageDao === null) {
      MessageDao.MessageDao = new MessageDao();
    }
    return MessageDao.MessageDao;
  };

  private constructor() {}

  /**
   * Create new message with a message json
   * @param  {message}  message json message
   * @returns  message
   */
  async createMessage(message: Message): Promise<any> {
    return await MessageModel.create(message);
  }

  /**
   * Delete message with message id
   * @param {string}  mid message id
   * @returns delete status
   */
  async deleteMessage(mid: string): Promise<any> {
    return await MessageModel.deleteOne({ _id: mid });
  }

  /**
   * Find message sent by user id
   * @param {string} uid user id
   * @returns meesage array
   */
  async findSentMessageByUserId(uid: string): Promise<any[]> {
    return await MessageModel.find({ from: uid })
      .populate("to")
      .populate("from")
      .exec();
  }

  /**
   * Find message received by user id
   * @param {string} uid user id
   * @returns {message} message
   */
  async findRecievedMessageByUserId(uid: string): Promise<any[]> {
    return await MessageModel.find({ to: uid })
      .populate("to")
      .populate("from")
      .exec();
  }
  /**
   *  update message with a new message
   * @param {string} mid message id
   * @param {message}message message to be updated
   * @returns message
   */
  async updateMessage(mid: string, message: any): Promise<any> {
    return await MessageModel.updateOne({ _id: mid }, { $set: message });
  }

  /**
   * Find messages from two user
   * @param uid1 user 1 id
   * @param uid2  user 2 id
   * @returns array of messages
   */
  async findMessageOf2Users(uid1: string, uid2: string): Promise<any> {
    const part1 = await MessageModel.find({
      $or: [
        { to: uid1, from: uid2 },
        { to: uid2, from: uid1 },
      ],
    })
      .populate("to", "username firstName lastName")
      .populate("from", "username firstName lastName")
      .exec();

    return part1;
  }
}
