/**
 * @file like dao for implementing CRUD operations
 */
import LikeDaoI from "../interfaces/like/LikeDaoI";
import Like from "../models/Like";
import LikeModel from "../mongoose/likes/LikeModel";

/**
 * @class LikeDao implements LikeDaoI
 * @property {LikeDao} LikeDao Singleton DAO implementing like CRUD operation
 *
 */
export default class LikeDao implements LikeDaoI {
  private static likeDao: LikeDao | null = null;

  /**
   * Create singleton LikeDao instance
   * @returns LikeDao
   */
  public static getInstance = (): LikeDao => {
    if (LikeDao.likeDao === null) {
      LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
  };
  private constructor() {}

  /**
   * Find all user that like this tuit
   * @param {string} tid tuit id
   * @returns like
   */
  findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
    LikeModel.find({ tuit: tid }).populate("likedBy").exec();

  /**
   * Find all tuits by user id
   * @param {string} uid user id
   * @returns like
   */
  findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
    LikeModel.find({ likedBy: uid }).populate("tuit").exec();

  /**
   * Create a like from user id and tuit id
   * @param {string }uid user id
   * @param {string }tid tuit id
   * @returns like
   */
  userLikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.create({ tuit: tid, likedBy: uid });

  /**
   * Delete tuits
   * @param {string }uid user id
   * @param {string }tid tuit id
   * @returns delete status
   */
  userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.deleteOne({ tuit: tid, likedBy: uid });
}
