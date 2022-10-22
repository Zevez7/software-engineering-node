import { Request, Response } from "express";

export default interface MessageController {
  createMessage(req: Request, res: Response): void;
  findSentMessageByUserId(req: Request, res: Response): void;
  findRecievedMessageByUserId(req: Request, res: Response): void;
  deleteMessage(req: Request, res: Response): void;
  updateMessage(req: Request, res: Response): void;
  findMessageOf2Users(req: Request, res: Response): void;
}
