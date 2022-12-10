/**
 * @file User Controller interface for RESTful Web service API for users resource
 */

import { Request, Response } from "express";
/**
 * @interface UserController interface
 */
export default interface UserController {
  /**
   * Retrieves all user
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user object
   */
  findAllUsers(req: Request, res: Response): void;
  /**
   * Retrieves a user by user id
   * @param {Request} req Represents request from client, including the params uid
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the user object
   */
  findUserById(req: Request, res: Response): void;
  /**
   * Create a user
   * @param {Request} req Represents request from client, including body
   * containing the JSON object for the new user to be inserted in the database
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new user that was inserted in the database
   */
  createUser(req: Request, res: Response): void;
  /**
   * Delete a user with a uid.
   * @param {Request} req Represents request from client, including path
   * parameter uid identifying the primary key of the user to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a user was successful or not
   */
  deleteUser(req: Request, res: Response): void;

  /**
   * Delete all user
   * @param {Request} req Represents request from client,
   * @param {Response} res Represents response to client, including status
   * on whether deleting a user was successful or not
   */
  deleteAllUsers(req: Request, res: Response): void;

  /**
   * Update user with uid
   * @param {Request} req Represents request from client, including path
   * parameter uid identifying the primary key of the user to be modified
   * @param {Response} res Represents response to client, including status
   * on whether updating a user was successful or not
   */
  updateUser(req: Request, res: Response): void;

  /**
   * find user by username
   * @param req Request from client including path with paramater username
   * @param res Response to the client with the found user.
   */
  findUserByUsername(req: Request, res: Response): void;

  /**
   * Delete user by username
   * @param {Request} req Represents request from client,
   * @param {Response} res Represents response to client, including status
   * on whether deleting a user was successful or not
   */
  deleteUsersByUsername(req: Request, res: Response): void;
}
