import { Request, Response, Express } from "express";

import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/bookmark/BookmarkController";

export default class BookmarkController implements BookmarkControllerI {
  private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
  private static bookmarkController: BookmarkController | null = null;

  public static getInstance = (app: Express): BookmarkController => {
    if (BookmarkController.bookmarkController === null) {
      BookmarkController.bookmarkController = new BookmarkController();

      app.post(
        "/bookmark",
        BookmarkController.bookmarkController.createBookmark
      );

      app.delete(
        "/bookmark/:bid",
        BookmarkController.bookmarkController.unbookmark
      );

      app.get(
        "/bookmark/user/:uid",
        BookmarkController.bookmarkController.findBookmarkTuitByUserId
      );

      app.delete(
        "/bookmark/user/:uid/unbookmarkall",
        BookmarkController.bookmarkController.unbookmarkAllByUserId
      );

      app.put(
        "/bookmark/:bid",
        BookmarkController.bookmarkController.updateBookmark
      );
    }

    return BookmarkController.bookmarkController;
  };

  private constructor() {}

  createBookmark = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .createBookmark(req.body)
      .then((bookmark) => res.json(bookmark));

  unbookmark = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .unbookmark(req.params.bid)
      .then((status) => res.json(status));

  findBookmarkTuitByUserId = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .findBookmarkTuitByUserId(req.params.uid)
      .then((bookmarks) => res.json(bookmarks));

  unbookmarkAllByUserId = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .unbookmarkAllByUserId(req.params.uid)
      .then((status) => res.json(status));

  updateBookmark = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .updateBookmark(req.params.bid, req.body)
      .then((bookmark) => res.json(bookmark));
}
