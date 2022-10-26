/**
 * @file followDao interface
 */
import Follow from "../../models/Follow";
import User from "../../models/user/User";

/**
 * @interface FollowDao inferface
 */
export default interface FollowDao {
  /**
   * Create follow document with the FollowModel
   * @param {Follow}follow json follow
   * @returns follow document
   */
  followUser(follow: Follow): Promise<Follow>;
  /**
   * Delete follow document with the FollowModel
   * @param {string} fid follow id
   * @returns delete status
   */
  unfollowUser(fid: string): Promise<any>;
  /**
   * Find all the following that match the user ID
   * @param  {string} uid user id
   * @returns  {follow[]} follow
   */
  findAllFollowing(uid: string): Promise<User[]>;
  /**
   * Find all the followed that match the user ID
   * @param  {string} uid user id
   * @returns  {follow[]} follow
   */
  findAllFollowed(uid: string): Promise<User[]>;
  /**
   * Delete all followed that match the user ID
   * @param {string} uid string
   * @returns {string} delete status
   */
  removeAllFollower(uid: string): Promise<any>;
  /**
   * update follow by fid with a new follow
   * @param {string}fid follow id
   * @param {follow} follow follow to be updated
   * @returns update status
   */
  updateFollowing(uid: string, follow: Follow): Promise<any>;
}
