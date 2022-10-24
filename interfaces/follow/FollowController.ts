/**
 * @file Interface for followController
 */
import { Request, Response } from "express";

/**
 * @interface FollowController
 */
export default interface FollowController {
  /**
   * Create a follow
   * @param {Request} req Represents request from client, including body
   * containing the JSON object for the new follow to be inserted in the database
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new follow that was inserted in the database
   */
  followUser(req: Request, res: Response): void;
  /**
   * Delete a follow with a bid.
   * @param {Request} req Represents request from client, including path
   * parameter bid identifying the primary key of the follow to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a follow was successful or not
   */
  unfollowUser(req: Request, res: Response): void;

  /**
   * Retrieves all follow with following that matches a uid
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the follow object
   */
  findAllFollowing(req: Request, res: Response): void;

  /**
   * Retrieves all follow with followed that matches a uid
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the follow object
   */
  findAllFollowed(req: Request, res: Response): void;

  /**
   * Delete all follow with a following that matches a uid.
   * @param {Request} req Represents request from client, including path
   * parameter uid identifying the primary key of the follow to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a follow was successful or not
   */
  removeAllFollower(req: Request, res: Response): void;

  /**
   * Update following with fid
   * @param {Request} req Represents request from client, including path
   * parameter fid identifying the primary key of the following to be modified
   * @param {Response} res Represents response to client, including status
   * on whether updating a following was successful or not
   */
  updateFollowing(req: Request, res: Response): void;
}
