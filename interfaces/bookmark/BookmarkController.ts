/**
 * @file Interface for bookmarkController
 */
import { Request, Response } from "express";

/**
 * @interface BookmarkController
 */
export default interface BookmarkController {
  /**
   * Create a bookmark
   * @param {Request} req Represents request from client, including body
   * containing the JSON object for the new bookmark to be inserted in the database
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new bookmark that was inserted in the database
   */
  createBookmark(req: Request, res: Response): void;

  /**
   * Delete a bookmark with a bid.
   * @param {Request} req Represents request from client, including path
   * parameter bid identifying the primary key of the bookmark to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a bookmark was successful or not
   */
  unbookmark(req: Request, res: Response): void;
  /**
   * Retrieves all bookmark from the database for a particular user and returns an array of bookmark and bookmarks.
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the bookmark and bookmark objects
   */
  findBookmarkTuitByUserId(req: Request, res: Response): void;

  /**
   * Delete all bookmark with the user id.
   * @param {Request} req Represents request from client, including path
   * parameter bid identifying the primary key of the bookmark to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a bookmark was successful or not
   */
  unbookmarkAllByUserId(req: Request, res: Response): void;

  /**
   * Update bookmark with bid
   * @param {Request} req Represents request from client, including path
   * parameter bid identifying the primary key of the bookmark to be modified
   * @param {Response} res Represents response to client, including status
   * on whether updating a bookmark was successful or not
   */
  updateBookmark(req: Request, res: Response): void;
}
