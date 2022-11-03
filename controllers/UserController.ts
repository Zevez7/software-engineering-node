/**
 * @file RESTful Web service API for users resource
 */

import { Request, Response, Express } from "express";

import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/user/UserController";

/**
 * @class UserController Implements RESTful Web service API for user resource.
 *   Defines the usering HTTP endpoints:
 * <ul>
 *     <li>POST /users to create a new user instance for
 *     a given user</li>
 *     <li>GET /users/:uid to retrieve users for a given uid </li>
 *     <li>GET /users retrieve all</li>
 *     <li>PUT /users/:uid to modify an individual user instance </li>
 *     <li>DELETE /users/:uid to remove a particular user instance</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web service API
 */
export default class UserController implements UserControllerI {
  private static userDao: UserDao = UserDao.getInstance();
  private static userController: UserController | null = null;

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return UserController
   */
  public static getInstance = (app: Express): UserController => {
    if (UserController.userController == null) {
      UserController.userController = new UserController();

      app.get("/users", UserController.userController.findAllUsers);
      app.get("/users/:uid", UserController.userController.findUserById);
      app.post("/users", UserController.userController.createUser);
      app.delete("/users/:uid", UserController.userController.deleteUser);
      app.delete("/users", UserController.userController.deleteAllUsers);
      app.delete(
        "/users/username/:username/delete",
        UserController.userController.deleteUsersByUsername
      );
      app.put("/users/:uid", UserController.userController.updateUser);
    }
    return UserController.userController;
  };

  private constructor() {}

  /**
   * Retrieves all user
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user object
   */
  findAllUsers = (req: Request, res: Response) =>
    UserController.userDao.findAllUsers().then((users) => res.json(users));

  /**
   * Retrieves a user by user id
   * @param {Request} req Represents request from client, including the params uid
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the user object
   */
  findUserById = (req: Request, res: Response) =>
    UserController.userDao
      .findUserById(req.params.uid)
      .then((user) => res.json(user));
  /**
   * Create a user
   * @param {Request} req Represents request from client, including body
   * containing the JSON object for the new user to be inserted in the database
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new user that was inserted in the database
   */
  createUser = (req: Request, res: Response) =>
    UserController.userDao.createUser(req.body).then((user) => res.json(user));

  /**
   * Delete a user with a uid.
   * @param {Request} req Represents request from client, including path
   * parameter uid identifying the primary key of the user to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a user was successful or not
   */
  deleteUser = (req: Request, res: Response) =>
    UserController.userDao
      .deleteUser(req.params.uid)
      .then((status) => res.json(status));

  /**
   * Delete a user by user name
   * @param {Request} req Represents request from client, including path
   * parameter username identifying the primary key of the user to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a user was successful or not
   */
  deleteUsersByUsername = (req: Request, res: Response) => {
    UserController.userDao
      .deleteUsersByUsername(req.params.username)
      .then((status) => res.json(status));
  };

  /**
   * Delete all user from the database
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including status
   * on whether deleting a user was successful or not
   */
  deleteAllUsers = (req: Request, res: Response) => {
    UserController.userDao.deleteAllUsers().then((status) => res.json(status));
  };

  /**
   * Update user with uid
   * @param {Request} req Represents request from client, including path
   * parameter uid identifying the primary key of the user to be modified
   * @param {Response} res Represents response to client, including status
   * on whether updating a user was successful or not
   */
  updateUser = (req: Request, res: Response) =>
    UserController.userDao
      .updateUser(req.params.uid, req.body)
      .then((status) => res.json(status));
}
