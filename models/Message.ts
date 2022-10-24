/**
 * @file declaring message class definition with relationship between a from user and to user
 */
import User from "./user/User";

/**
 * @class Message class for defining relationship
 * @property {string} message user message
 * @property {User} to message sending to user
 * @property {User} from message sent from user
 * @property {Date} sentOn date of the message
 */
export default class Message {
  private message: string = "";
  private to: User;
  private from: User;
  private sentOn: Date = new Date();
}
