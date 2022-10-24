/**
 * @file tuit Dao for implementing CRUD operations
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/tuit/TuitModel";
import TuitDaoI from "../interfaces/tuit/TuitDao";

/**
 * @class TuitDao implements TuitDaoI
 * @property {TuitDao} TuitDao Singleton DAO implementing tuit CRUD operation
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
    return await TuitModel.find();
  }

  /**
   * Find tuit by user id
   * @param {string}uid user id
   * @returns array of tuit
   */
  async findTuitsByUser(uid: string): Promise<any> {
    return await TuitModel.find({ postedBy: uid }).populate(
      "postedBy",
      "username firstName lastName"
    );
  }

  /**
   * Find one tuit by the tuit id
   * @param {string}tid tuid id
   * @returns tuit
   */
  async findTuitById(tid: string): Promise<any> {
    return await TuitModel.findById(tid).populate(
      "postedBy",
      "username firstName lastName"
    );
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
   * @param {string}tid tuit id
   * @returns delete status
   */
  async deleteTuit(tid: string): Promise<any> {
    return await TuitModel.deleteOne({ _id: tid });
  }
}
