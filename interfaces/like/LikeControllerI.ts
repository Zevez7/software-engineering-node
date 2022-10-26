/**
 * @file LikeController interface
 */
import { Request, Response } from "express";

/**
 * @interface LikeController implements LikeControllerI
 */
export default interface LikeControllerI {
  /**
   * Retrieves all users that liked a tuit from the database
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the liked tuit
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  findAllUsersThatLikedTuit(req: Request, res: Response): void;
  /**
   * Retrieves all tuits liked by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user liked the tuits
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were liked
   */
  findAllTuitsLikedByUser(req: Request, res: Response): void;
  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is liking the tuit
   * and the tuit being liked
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new likes that was inserted in the
   * database
   */
  userLikesTuit(req: Request, res: Response): void;
  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is unliking
   * the tuit and the tuit being unliked
   * @param {Response} res Represents response to client, including status
   * on whether deleting the like was successful or not
   */
  userUnlikesTuit(req: Request, res: Response): void;
}
