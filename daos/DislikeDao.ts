/**
 * @file like dao for implementing CRUD operations
 */
import DislikeDaoI from "../interfaces/dislike/DislikeDao";
import Dislike from "../models/Dislike";
import DislikeModel from "../mongoose/dislikes/DislikeModel";

/**
 * @class DislikeDoa implements DislikeDao interface
 * @property {DislikeDao} DislikeDao Singleton DAO implementing like CRUD operation
 *
 */
export default class DislikeDao implements DislikeDaoI {
  private static dislikeDao: DislikeDao | null = null;

  /**
   * Create singleton DislikeDao instance
   * @returns DislikeDao
   */
  public static getInstance = (): DislikeDao => {
    if (DislikeDao.dislikeDao === null) {
      DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
  };
  private constructor() {}

  /**
   * Create a dislike from user id and tuit id
   * @param {string} uid user id
   * @param {string} tid tuit id
   * @returns like
   */
  userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
    DislikeModel.create({ tuit: tid, dislikedBy: uid });
  /**
   * Delete a dislike from database
   * @param {string} uid user id
   * @param {string} tid tuit id
   * @returns delete status
   */
  userUnDislikesTuit = async (uid: string, tid: string): Promise<any> =>
    DislikeModel.deleteOne({ tuit: tid, dislikedby: uid });

  /**
   * Find all tuits disliked by user id
   * @param {string} uid user id
   * @returns like
   */
  findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
    DislikeModel.findOne({ tuit: tid, dislikedby: uid });

  /**
   * Count how many dislike there is for a tuit
   * @param tid tuit id
   */
  countHowManyDislikedTuit = async (tid: string): Promise<any> =>
    DislikeModel.count({ tuit: tid });
}
