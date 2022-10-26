/**
 * @file like dao interface for implementing CRUD operations
 */
import Like from "../../models/Like";

/**
 * @interface LikeDaoI interface
 */

export default interface LikeDaoI {
  /**
   * Find all user that like this tuit
   * @param {string} tid tuit id
   * @returns like
   */
  findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
  /**
   * Find all tuits by user id
   * @param {string} uid user id
   * @returns like
   */
  findAllTuitsLikedByUser(uid: string): Promise<Like[]>;

  /**
   * Create a like from user id and tuit id
   * @param {string }uid user id
   * @param {string }tid tuit id
   * @returns like
   */
  userUnlikesTuit(tid: string, uid: string): Promise<any>;
  /**
   * Delete tuits
   * @param {string }uid user id
   * @param {string }tid tuit id
   * @returns delete status
   */
  userLikesTuit(tid: string, uid: string): Promise<Like>;
}
