import { Request, Response } from "express";

export default interface FollowController {
  createBookmark(req: Request, res: Response): void;
  unbookmark(req: Request, res: Response): void;
  findBookmarkTuitByUserId(req: Request, res: Response): void;
  unbookmarkAllByUserId(req: Request, res: Response): void;
  updateBookmark(req: Request, res: Response): void;
}
