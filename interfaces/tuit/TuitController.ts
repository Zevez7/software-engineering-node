/**
 * @file TuitController interface for RESTful Web service API for Tuit resource
 */
import { Request, Response } from "express";
/**
 * @interface TuitController interface
 */
export default interface TuitController {
  /**
   * Find all tuits
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects
   */
  findAllTuits(req: Request, res: Response): void;
  /**
   * Find tuit by user id
   * an array of tuits.
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects
   */
  findTuitById(req: Request, res: Response): void;
  /**
   * Find tuit by tuit id.
   * @param {Request} req Represents request from client, including path
   * parameter tid identifying the primary key of the tuit to be retrieved
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the tuit that matches the user ID
   */
  findTuitsByUser(req: Request, res: Response): void;
  /**
   * Create Tuit
   * @param {Request} req Represents request from client, including body
   * containing the JSON object for the new tuit to be inserted in the
   * database
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new tuit that was inserted in the
   * database
   */
  createTuit(req: Request, res: Response): void;

  /**
   * Create Tuit with a user id
   * @param {Request} req Represents request from client, including body
   * and a user id containing the JSON object for the new tuit to be
   * inserted in the database.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new tuit that was inserted in the
   * database
   */
  createTuitByUser(req: Request, res: Response): void;

  /**
   * Update tuit by tuit id.
   * @param {Request} req Represents request from client, including path
   * parameter tid identifying the primary key of the tuit to be modified
   * @param {Response} res Represents response to client, including status
   * on whether updating a tuit was successful or not
   */
  updateTuit(req: Request, res: Response): void;
  /**
   * Delete tuit by tuit id
   * @param {Request} req Represents request from client, including path
   * parameter uid identifying the primary key of the tuit to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a user was successful or not
   */
  deleteTuit(req: Request, res: Response): void;
}
