/**
 * @file Controller RESTful Web service API for message resource
 */
import { Request, Response, Express } from "express";

import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/message/MessageController";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul></ul>
 *     <li>POST /message create messages
 *     </li>
 *     <li>GET /message/:mid delete messages
 *     </li>
 *     <li>GET /message/from/user/:uid find from message by uid
 *     </li>
 *     <li>GET /message/from/user/:uid find to message by uid
 *     </li>
 *     <li>PUT /message/update/:mid update message
 *     </li>
 *     <li>GET /message/user1/:uid1/user2/:uid2 get messages from two user
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
  private static messageDao: MessageDao = MessageDao.getInstance();
  private static messageController: MessageController | null = null;

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return MessageController
   */
  public static getInstance = (app: Express): MessageController => {
    if (MessageController.messageController === null) {
      MessageController.messageController = new MessageController();

      app.post("/message", MessageController.messageController.createMessage);

      app.delete(
        "/message/:mid",
        MessageController.messageController.deleteMessage
      );

      app.get(
        "/message/from/user/:uid",
        MessageController.messageController.findSentMessageByUserId
      );

      app.get(
        "/message/to/user/:uid",
        MessageController.messageController.findRecievedMessageByUserId
      );

      app.put(
        "/message/update/:mid",
        MessageController.messageController.updateMessage
      );

      app.get(
        "/message/user1/:uid1/user2/:uid2",
        MessageController.messageController.findMessageOf2Users
      );
    }

    return MessageController.messageController;
  };

  private constructor() {}

  /**
   * Create a message
   * @param {Request} req Represents request from client, including the
   * a json body with a message, to, from and sentOn
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new message that was inserted in the database
   */
  createMessage = (req: Request, res: Response) =>
    MessageController.messageDao
      .createMessage(req.body)
      .then((message) => res.json(message));

  /**
   * Delete a message with a mid param.
   * @param {Request} req Represents request from client, including path
   * parameter mid identifying the primary key of the message to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a message was successful or not
   */
  deleteMessage = (req: Request, res: Response) =>
    MessageController.messageDao
      .deleteMessage(req.params.mid)
      .then((status) => res.json(status));

  /**
   * Retrieves all sent message with uid param.
   * @param {Request} req Represents request from client, including path
   * parameter uid identifying the primary key of the message to be modified
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the message objects
   */
  findSentMessageByUserId = (req: Request, res: Response) =>
    MessageController.messageDao
      .findSentMessageByUserId(req.params.uid)
      .then((messages) => res.json(messages));

  /**
   * Retrieves all from message with uid param.
   * @param {Request} req Represents request from client, including path
   * parameter uid identifying the primary key of the message to be modified
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the message objects
   */
  findRecievedMessageByUserId = (req: Request, res: Response) =>
    MessageController.messageDao
      .findRecievedMessageByUserId(req.params.uid)
      .then((messages) => res.json(messages));
  /**
   * Update message with mid
   * @param {Request} req Represents request from client, including path
   * parameter mid identifying the primary key of the message to be modified
   * @param {Response} res Represents response to client, including status
   * on whether updating a message was successful or not
   */
  updateMessage = (req: Request, res: Response) =>
    MessageController.messageDao
      .updateMessage(req.params.mid, req.body)
      .then((message) => res.json(message));
  /**
   * Retrieves all messages from two user.
   * @param {Request} req Represents request from client, including path
   * parameter uid1 and uid2 identifying the primary key of the message to be modified
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the message objects
   */
  findMessageOf2Users = (req: Request, res: Response) =>
    MessageController.messageDao
      .findMessageOf2Users(req.params.uid1, req.params.uid2)
      .then((messages) => res.json(messages));
}
