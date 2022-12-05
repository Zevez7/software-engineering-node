/**
 * @file tuit Dao for implementing CRUD operations
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/tuit/TuitModel";
import TuitDaoI from "../interfaces/tuit/TuitDao";

/**
 * @class TuitDao implements TuitDaoI
 * @property {TuitDao} TuitDao Singleton DAO implementing CRUD operation
 */
export default class TuitDao implements TuitDaoI {
  private static tuitDao: TuitDao | null = null;

  /**
   * Create singleton TuitDao instance
   * @returns TuitDao
   */
  public static getInstance = (): TuitDao => {
    if (TuitDao.tuitDao === null) {
      TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
  };
  private constructor() {}

  /**
   * Find all tuits
   * @returns array of tuit
   */
  async findAllTuits(): Promise<Tuit[]> {
    return await TuitModel.find().sort({ postedOn: -1 }).populate({
      path: "postedBy",
      select: "username",
    });
  }

  /**
   * Find tuit by user id
   * @param {string}uid user id
   * @returns array of tuit
   */
  async findTuitsByUser(uid: string): Promise<any> {
    return await TuitModel.find({ postedBy: uid });
  }

  /**
   * Find one tuit by the tuit id
   * @param {string}tid tuid id
   * @returns tuit
   */
  async findTuitById(tid: string): Promise<any> {
    return await TuitModel.findById(tid);
  }
  /**
   * Create new tuit
   * @param {tuit}tuit tuit
   * @returns tuit
   */
  async createTuit(tuit: Tuit): Promise<any> {
    return await TuitModel.create(tuit);
  }

  /**
   * Create new tuit by user id
   * @param {tuit} tuit tuit
   * @param {uid} uid user id
   * @returns tuit
   */
  async createTuitByUser(uid: string, tuit: Tuit): Promise<any> {
    return await TuitModel.create({ ...tuit, postedBy: uid });
  }

  /**
   * Update tuit
   * @param {string}tid tuit id
   * @param {tuit}tuit tuit to be updated
   * @returns update status
   */

  async updateTuit(tid: string, tuit: any): Promise<any> {
    return await TuitModel.updateOne({ _id: tid }, { $set: tuit });
  }
  /**
   * delete tuit
   * @param {string} uid user id
   * @returns delete status
   */
  async deleteTuit(uid: string): Promise<any> {
    return await TuitModel.deleteOne({ postedBy: uid });
  }

  /**
   * Updating the likes on a tuit message
   * @param tid tuit id
   * @param newStats the new status that's updating
   */
  async updateLikes(tid: string, newStats: any): Promise<any> {
    return await TuitModel.updateOne(
      { _id: tid },
      { $set: { stats: newStats } }
    );
  }
}
