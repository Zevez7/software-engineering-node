/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import DislikeDao from "../daos/DislikeDao";
import DislikeControllerI from "../interfaces/dislike/DislikeController";

import TuitDao from "../daos/TuitDao";
import TuitDaoI from "../interfaces/tuit/TuitDao";
import Tuit from "../models/Tuit";
import LikeDao from "../daos/LikeDao";
import LikeDaoI from "../interfaces/like/LikeDaoI";

/**
 * @class DislikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no longer likes a tuit</li>
 * </ul>
 * @property {DislikeDao} DislikeDao Singleton DAO implementing likes CRUD operations
 * @property {DislikeControllerI} DislikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DislikeController implements DislikeControllerI {
  private static dislikeDao: DislikeDao = DislikeDao.getInstance();
  private static dislikeController: DislikeController | null = null;

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return DislikeController
   */
  public static getInstance = (app: Express): DislikeController => {
    if (DislikeController.dislikeController === null) {
      DislikeController.dislikeController = new DislikeController();
      app.get(
        "/api/users/:uid/dislikes",
        DislikeController.dislikeController.findAllTuitsDislikedByUser
      );
      app.post(
        "/api/users/:uid/dislikes/:tid",
        DislikeController.dislikeController.userDislikesTuit
      );
      app.delete(
        "/api/users/:uid/undislikes/:tid",
        DislikeController.dislikeController.userUnDislikesTuit
      );
      app.put(
        "/api/users/:uid/dislike/:tid",
        DislikeController.dislikeController.userTogglesTuitDislikes
      );
    }
    return DislikeController.dislikeController;
  };

  private constructor() {}
  /**
   * Retrieves all disliked with a user id from the database
   * @param {Request} req Represents request from client, including the
   * parameter uid representing the user uid
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the disliked objects for the user
   */
  findAllTuitsDislikedByUser = (req: any, res: any) => {
    const uid = req.params.uid;
    const profile = req.session["profile"];
    const userId = uid === "me" && profile ? profile._id : uid;
    DislikeController.dislikeDao
      .findAllTuitsDislikedByUser(userId)
      .then((dislikes) => {
        const dislikesNonNullTuits = dislikes.filter(
          (dislikes) => dislikes.tuit
        );
        const tuitsFromDislike = dislikesNonNullTuits.map(
          (dislikes) => dislikes.tuit
        );
        res.json(tuitsFromDislike);
      });
  };
  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is disliking the tuit
   * and the tuit being liked
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new dislike that was inserted in the
   * database
   */
  userDislikesTuit = (req: Request, res: Response) =>
    DislikeController.dislikeDao
      .userDislikesTuit(req.params.uid, req.params.tid)
      .then((dislike) => res.json(dislike));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is undisliking
   * the tuit and the tuit being undisliked
   * @param {Response} res Represents response to client, including status
   * on whether deleting the dislike was successful or not
   */
  userUnDislikesTuit = (req: Request, res: Response) =>
    DislikeController.dislikeDao
      .userUnDislikesTuit(req.params.uid, req.params.tid)
      .then((status) => res.send(status));

  /**
   *
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is to find a dislike tuit
   * @param {Response} res Represents response to client, returning the disliked tuit.
   */
  findUserDislikesTuit = (req: Request, res: Response) =>
    DislikeController.dislikeDao
      .findUserDislikesTuit(req.params.uid, req.params.tid)
      .then((dislike) => res.send(dislike));

  /**
   * @param {Request} req Represents request from client, include a parameter for tuit id
   * @param {Response} res Represents response to client, returning the count of how many disliked tuit
   */
  countHowManyDislikedTuit = (req: Request, res: Response) =>
    DislikeController.dislikeDao
      .countHowManyDislikedTuit(req.params.tid)
      .then((likes) => res.send(likes));

  /**
   * @param {Request} req Represents request from client, include a parameter for tuit id and user id
   * @param {Response} res Represents response to client, returning  a status for success or failed
   */
  userTogglesTuitDislikes = async (req: any, res: any) => {
    const tuitDao: TuitDaoI = TuitDao.getInstance();
    const likeDao: LikeDaoI = LikeDao.getInstance();
    const uid = req.params.uid;
    const tid = req.params.tid;
    const profile = req.session["profile"];
    const userId = uid === "me" && profile ? profile._id : uid;
    try {
      const userAlreadyDislikedTuit =
        await DislikeController.dislikeDao.findUserDislikesTuit(userId, tid);

      const userAlreadyLikedTuit = await likeDao.findUserLikesTuit(userId, tid);

      const howManyDislikedTuit =
        await DislikeController.dislikeDao.countHowManyDislikedTuit(tid);

      const howManyLikedTuit = await likeDao.countHowManyLikedTuit(tid);

      let tuit: Tuit = await tuitDao.findTuitById(tid);
      if (userAlreadyDislikedTuit) {
        // if already disliked, delete disliked
        await DislikeController.dislikeDao.userUnDislikesTuit(userId, tid);
        tuit.stats.dislikes = howManyDislikedTuit - 1;
      } else {
        // if not disliked, then add disliked
        await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
        tuit.stats.dislikes = howManyDislikedTuit + 1;

        if (userAlreadyLikedTuit) {
          await likeDao.userUnlikesTuit(userId, tid);
          tuit.stats.likes = howManyLikedTuit - 1;
        }
      }
      await tuitDao.updateLikes(tid, tuit.stats);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  };
}
