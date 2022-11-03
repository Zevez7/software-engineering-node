/**
 * @file user Dao interface for implementing CRUD operations
 */
import User from "../../models/user/User";

/**
 * @interface UserDao interface
 */
export default interface UserDao {
  /**
   * Find all user
   * @returns array of user
   */
  findAllUsers(): Promise<User[]>;

  /**
   * Find user by user id
   * @param {string}uid user id
   * @returns user
   */
  findUserById(uid: string): Promise<any>;
  /**
   * Create new user
   * @param user User object
   * @returns user
   */
  createUser(user: User): Promise<User>;
  /**
   * Update user
   * @param uid user id
   * @param user user
   * @returns update status
   */
  updateUser(uid: string, user: User): Promise<any>;
  /**
   * Delete user
   * @param uid user id
   * @returns delete status
   */
  deleteUser(uid: string): Promise<any>;

  /**
   * Delete user
   * @param username user name
   * @returns delete status
   */
  deleteUsersByUsername(username: string): Promise<any>;

  /**
   * Delete all user
   * @returns delete status
   */
  deleteAllUsers(): Promise<any>;
}
