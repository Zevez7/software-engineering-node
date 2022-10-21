import { Request, Response, Express } from "express";

import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/message/MessageController";

// implements MessageControllerI
export default class MessageController {
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

      // app.get(
      //   "/message/user/:uid",
      //   MessageController.messageController.findMessageTuitByUserId
      // );

      // app.delete(
      //   "/message/user/:uid/unmessageall",
      //   MessageController.messageController.unmessageAllByUserId
      // );

      // app.put(
      //   "/message/:bid",
      //   MessageController.messageController.updateMessage
      // );
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

  // findMessageTuitByUserId = (req: Request, res: Response) =>
  //   MessageController.messageDao
  //     .findMessageTuitByUserId(req.params.uid)
  //     .then((messages) => res.json(messages));

  // unmessageAllByUserId = (req: Request, res: Response) =>
  //   MessageController.messageDao
  //     .unmessageAllByUserId(req.params.uid)
  //     .then((status) => res.json(status));

  // updateMessage = (req: Request, res: Response) =>
  //   MessageController.messageDao
  //     .updateMessage(req.params.bid, req.body)
  //     .then((message) => res.json(message));
}
