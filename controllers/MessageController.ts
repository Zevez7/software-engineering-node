import { Request, Response, Express } from "express";

import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/message/MessageController";

export default class MessageController implements MessageControllerI {
  private static messageDao: MessageDao = MessageDao.getInstance();
  private static messageController: MessageController | null = null;

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

  createMessage = (req: Request, res: Response) =>
    MessageController.messageDao
      .createMessage(req.body)
      .then((message) => res.json(message));

  deleteMessage = (req: Request, res: Response) =>
    MessageController.messageDao
      .deleteMessage(req.params.mid)
      .then((status) => res.json(status));

  findSentMessageByUserId = (req: Request, res: Response) =>
    MessageController.messageDao
      .findSentMessageByUserId(req.params.uid)
      .then((messages) => res.json(messages));

  findRecievedMessageByUserId = (req: Request, res: Response) =>
    MessageController.messageDao
      .findRecievedMessageByUserId(req.params.uid)
      .then((messages) => res.json(messages));

  updateMessage = (req: Request, res: Response) =>
    MessageController.messageDao
      .updateMessage(req.params.mid, req.body)
      .then((message) => res.json(message));

  findMessageOf2Users = (req: Request, res: Response) =>
    MessageController.messageDao
      .findMessageOf2Users(req.params.uid1, req.params.uid2)
      .then((messages) => res.json(messages));
}
