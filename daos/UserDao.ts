import User from "../models/user/User";
import UserModel from "../mongoose/user/UserModel";
import UserDaoI from "../interfaces/user/UserDao";

export default class UserDao implements UserDaoI {
  private static userDao: UserDao | null = null;
  public static getInstance = (): UserDao => {
    if (UserDao.userDao === null) {
      UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
  };
  private constructor() {}

  async findAllUsers(): Promise<User[]> {
    return await UserModel.find();
  }
  async findUserById(uid: string): Promise<any> {
    return await UserModel.findById(uid);
  }
  async createUser(user: User): Promise<any> {
    return await UserModel.create(user);
  }
  async deleteUser(uid: string): Promise<any> {
    return await UserModel.deleteOne({ _id: uid });
  }
  async updateUser(uid: string, user: any): Promise<any> {
    return await UserModel.updateOne({ _id: uid }, { $set: user });
  }
}
