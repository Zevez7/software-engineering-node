/**
 * @file Controller RESTful Web service API for follower resource
 */
import { Request, Response, Express } from "express";

import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/follow/FollowController";

/**
 * @class FollowController Implements RESTful Web service API for follow resource.
 *   Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /follow to create a new follow instance for
 *     a given user</li>
 *     <li>GET /follow/user/:uid/following to retrieve follows for a given user in the following field </li>
 *     <li>GET /follow/user/:uid/followed to retrieve follows for a given user in the following field </li>
 *     <li>PUT /follow/:fid/update to modify an individual follow instance </li>
 *     <li>DELETE /follows/:fid to remove a particular follow instance</li>
 *      <li>DELETE /follow/user/:uid/removeFollowing to remove all following by uid</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follow CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
  private static followDao: FollowDao = FollowDao.getInstance();
  private static followController: FollowController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return FollowController
   */
  public static getInstance = (app: Express): FollowController => {
    if (FollowController.followController === null) {
      FollowController.followController = new FollowController();

      app.post("/follow", FollowController.followController.followUser);

      app.delete(
        "/follow/:fid",
        FollowController.followController.unfollowUser
      );

      app.get(
        "/follow/user/:uid/following",
        FollowController.followController.findAllFollowing
      );

      app.get(
        "/follow/user/:uid/followed",
        FollowController.followController.findAllFollowed
      );

      app.delete(
        "/follow/user/:uid/removeFollowing",
        FollowController.followController.removeAllFollower
      );

      app.put(
        "/follow/:fid/update",
        FollowController.followController.updateFollowing
      );
    }

    return FollowController.followController;
  };

  private constructor() {}
  /**
   * Create a follow
   * @param {Request} req Represents request from client, including body
   * containing the JSON object for the new follow to be inserted in the database
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new follow that was inserted in the database
   */
  followUser = (req: Request, res: Response) =>
    FollowController.followDao
      .followUser(req.body)
      .then((follow) => res.json(follow));

  /**
   * Delete a follow with a bid.
   * @param {Request} req Represents request from client, including path
   * parameter bid identifying the primary key of the follow to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a follow was successful or not
   */
  unfollowUser = (req: Request, res: Response) =>
    FollowController.followDao
      .unfollowUser(req.params.fid)
      .then((status) => res.json(status));

  /**
   * Retrieves all follow with following that matches a uid
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the follow object
   */
  findAllFollowing = (req: Request, res: Response) =>
    FollowController.followDao
      .findAllFollowing(req.params.uid)
      .then((follows) => res.json(follows));
  /**
   * Retrieves all follow with followed that matches a uid
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the follow object
   */
  findAllFollowed = (req: Request, res: Response) =>
    FollowController.followDao
      .findAllFollowed(req.params.uid)
      .then((follows) => res.json(follows));

  /**
   * Delete all follow with a following that matches a uid.
   * @param {Request} req Represents request from client, including path
   * parameter uid identifying the primary key of the follow to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a follow was successful or not
   */
  removeAllFollower = (req: Request, res: Response) =>
    FollowController.followDao
      .removeAllFollower(req.params.uid)
      .then((follows) => res.json(follows));

  /**
   * Update following with fid
   * @param {Request} req Represents request from client, including path
   * parameter fid identifying the primary key of the following to be modified
   * @param {Response} res Represents response to client, including status
   * on whether updating a following was successful or not
   */
  updateFollowing = (req: Request, res: Response) =>
    FollowController.followDao
      .updateFollowing(req.params.fid, req.body)
      .then((follow) => res.json(follow));
}
