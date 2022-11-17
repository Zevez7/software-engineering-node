/**
 * @file user Dao for implementing CRUD operations
 */
import User from "../models/user/User";
import UserModel from "../mongoose/user/UserModel";
import UserDaoI from "../interfaces/user/UserDao";

/**
 * @class UserDao implements UserDaoI
 * @property {UserDao} UserDao Singleton DAO implementing user CRUD operation
 */
export default class UserDao implements UserDaoI {
  private static userDao: UserDao | null = null;

  /**
   * Create singleton UserDao instance
   * @returns UserDao
   */
  public static getInstance = (): UserDao => {
    if (UserDao.userDao === null) {
      UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
  };
  private constructor() {}

  /**
   * Find all user
   * @returns array of user
   */
  async findAllUsers(): Promise<User[]> {
    return await UserModel.find();
  }
  /**
   * Find user by user id
   * @param {string}uid user id
   * @returns user
   */
  async findUserById(uid: string): Promise<any> {
    return await UserModel.findById(uid);
  }
  /**
   * Create new user
   * @param user User object
   * @returns user
   */
  async createUser(user: User): Promise<any> {
    return await UserModel.create(user);
  }
  /**
   * Delete user
   * @param uid user id
   * @returns delete status
   */
  async deleteUser(uid: string): Promise<any> {
    return await UserModel.deleteOne({ _id: uid });
  }

  /**
   * Delete user by username
   * @param username username
   * @returns delete status
   */
  deleteUsersByUsername = async (username: string): Promise<any> =>
    UserModel.deleteMany({ username });
  /**
   * Delete all user
   * @returns delete status
   */
  deleteAllUsers = async (): Promise<any> => UserModel.deleteMany({});

  /**
   * Update user
   * @param uid user id
   * @param user user
   * @returns update status
   */
  async updateUser(uid: string, user: any): Promise<any> {
    return await UserModel.updateOne({ _id: uid }, { $set: user });
  }

  /**
   * Update user
   * @param uid user id
   * @param user user
   * @returns update status
   */
  async findUserByUsername(username: string): Promise<any> {
    return await UserModel.find({ username: username });
  }
}
