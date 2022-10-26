/**
 * @file Message Dao interface for implementing CRUD operations
 */

import Message from "../../models/Message";

/**
 * @interface MessageDao interface
 */
export default interface MessageDao {
  /**
   * Create new message with a message json
   * @param  {message}  message json message
   * @returns  message
   */
  createMessage(message: Message): Promise<Message>;
  /**
   * Find message sent by user id
   * @param {string} uid user id
   * @returns meesage array
   */
  findSentMessageByUserId(uid: string): Promise<Message[]>;
  /**
   * Find message received by user id
   * @param {string} uid user id
   * @returns {message} message
   */
  findRecievedMessageByUserId(uid: string): Promise<Message[]>;
  /**
   * Delete message with message id
   * @param {string}  mid message id
   * @returns delete status
   */
  deleteMessage(mid: string): Promise<any>;
  /**
   *  update message with a new message
   * @param {string} mid message id
   * @param {message}message message to be updated
   * @returns message
   */
  updateMessage(mid: string, message: Message): Promise<any>;
  /**
   * Find messages from two user
   * @param uid1 user 1 id
   * @param uid2  user 2 id
   * @returns array of messages
   */
  findMessageOf2Users(uid1: string, uid2: string): Promise<Message[]>;
}
