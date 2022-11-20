/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/like/LikeControllerI";

import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/tuit/TuitController";
import TuitDaoI from "../interfaces/tuit/TuitDao";
import TuitController from "./TuitController";
import Tuit from "../models/Tuit";

/**
 * @class LikeController Implements RESTful Web service API for likes resource.
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
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {
  private static likeDao: LikeDao = LikeDao.getInstance();
  private static likeController: LikeController | null = null;

  // private static tuitDao: TuitDao = TuitDao.getInstance();
  private static TuitController: TuitController | null = null;

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return LikeController
   */
  public static getInstance = (app: Express): LikeController => {
    if (LikeController.likeController === null) {
      LikeController.likeController = new LikeController();
      app.get(
        "/api/users/:uid/likes",
        LikeController.likeController.findAllTuitsLikedByUser
      );
      app.get(
        "/api/tuits/:tid/likes",
        LikeController.likeController.findAllUsersThatLikedTuit
      );
      app.post(
        "/api/users/:uid/likes/:tid",
        LikeController.likeController.userLikesTuit
      );
      app.delete(
        "/api/users/:uid/unlikes/:tid",
        LikeController.likeController.userUnlikesTuit
      );
      app.put(
        "/api/users/:uid/likes/:tid",
        LikeController.likeController.userTogglesTuitLikes
      );
    }
    return LikeController.likeController;
  };

  private constructor() {}

  /**
   * Retrieves all users that liked a tuit from the database
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the liked tuit
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  findAllUsersThatLikedTuit = (req: Request, res: Response) =>
    LikeController.likeDao
      .findAllUsersThatLikedTuit(req.params.tid)
      .then((likes) => res.json(likes));

  /**
   * Retrieves all tuits liked by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user liked the tuits
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were liked
   */
  findAllTuitsLikedByUser = (req: Request, res: Response) =>
    LikeController.likeDao
      .findAllTuitsLikedByUser(req.params.uid)
      .then((likes) => res.json(likes));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is liking the tuit
   * and the tuit being liked
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new likes that was inserted in the
   * database
   */
  userLikesTuit = (req: Request, res: Response) =>
    LikeController.likeDao
      .userLikesTuit(req.params.uid, req.params.tid)
      .then((likes) => res.json(likes));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is unliking
   * the tuit and the tuit being unliked
   * @param {Response} res Represents response to client, including status
   * on whether deleting the like was successful or not
   */
  userUnlikesTuit = (req: Request, res: Response) =>
    LikeController.likeDao
      .userUnlikesTuit(req.params.uid, req.params.tid)
      .then((status) => res.send(status));

  /**
   *
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is to find a liked tuit
   * @param {Response} res  Represents response to client, returning the liked tuit.
   */
  findUserLikesTuit = (req: Request, res: Response) =>
    LikeController.likeDao
      .findUserLikesTuit(req.params.uid, req.params.tid)
      .then((likes) => res.send(likes));

  /**
   * @param {Request} req Represents request from client, include a parameter for tuit id
   * @param {Response} res  Represents response to client, returning the count of how many liked tuit
   */
  countHowManyLikedTuit = (req: Request, res: Response) =>
    LikeController.likeDao
      .countHowManyLikedTuit(req.params.tid)
      .then((likes) => res.send(likes));

  /**
   *
   * @param {Request} req Represents request from client, include a parameter for uid and tid
   * @param {Response} res  Represents response to client, reponse with 200 if successful or 404 for unsuccessful
   */
  userTogglesTuitLikes = async (req: any, res: any) => {
    const tuitDao: TuitDaoI = TuitDao.getInstance();
    const uid = req.params.uid;
    const tid = req.params.tid;
    const profile = req.session["profile"];
    const userId = uid === "me" && profile ? profile._id : uid;
    try {
      const userAlreadyLikedTuit =
        await LikeController.likeDao.findUserLikesTuit(userId, tid);
      const howManyLikedTuit =
        await LikeController.likeDao.countHowManyLikedTuit(tid);
      console.log("userAlreadyLikedTuit", userAlreadyLikedTuit);
      console.log(howManyLikedTuit);
      let tuit: Tuit = await tuitDao.findTuitById(tid);
      console.log(tuit);
      if (userAlreadyLikedTuit) {
        await LikeController.likeDao.userUnlikesTuit(userId, tid);
        tuit.stats.likes = howManyLikedTuit - 1;
      } else {
        await LikeController.likeDao.userLikesTuit(userId, tid);
        tuit.stats.likes = howManyLikedTuit + 1;
      }
      await tuitDao.updateLikes(tid, tuit.stats);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  };
}
