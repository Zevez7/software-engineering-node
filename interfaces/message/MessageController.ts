/**
 * @file Controller interface RESTful Web service API for message resource
 */
import { Request, Response } from "express";

/**
 * @interface MessageContronller interface
 */
export default interface MessageController {
  /**
   * Create a message
   * @param {Request} req Represents request from client, including the
   * a json body with a message, to, from and sentOn
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new message that was inserted in the database
   */
  createMessage(req: Request, res: Response): void;
  /**
   * Retrieves all sent message with uid param.
   * @param {Request} req Represents request from client, including path
   * parameter uid identifying the primary key of the message to be modified
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the message objects
   */
  findSentMessageByUserId(req: Request, res: Response): void;
  /**
   * Retrieves all from message with uid param.
   * @param {Request} req Represents request from client, including path
   * parameter uid identifying the primary key of the message to be modified
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the message objects
   */
  findRecievedMessageByUserId(req: Request, res: Response): void;
  /**
   * Delete a message with a mid param.
   * @param {Request} req Represents request from client, including path
   * parameter mid identifying the primary key of the message to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a message was successful or not
   */
  deleteMessage(req: Request, res: Response): void;
  /**
   * Update message with mid
   * @param {Request} req Represents request from client, including path
   * parameter mid identifying the primary key of the message to be modified
   * @param {Response} res Represents response to client, including status
   * on whether updating a message was successful or not
   */
  updateMessage(req: Request, res: Response): void;
  /**
   * Retrieves all messages from two user.
   * @param {Request} req Represents request from client, including path
   * parameter uid1 and uid2 identifying the primary key of the message to be modified
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the message objects
   */
  findMessageOf2Users(req: Request, res: Response): void;
}
