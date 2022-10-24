/**
 * @file interface for bookmarkdao
 */
import Bookmark from "../../models/Bookmark";
import Tuit from "../../models/Tuit";
import User from "../../models/user/User";

/**
 * Interface for bookmarkDao
 */
export default interface BookmarkDao {
  /**
   * Create bookmark document with the BookmarkModel
   * @param {Bookmark}bookmark json bookmark
   * @returns {Bookmark} bookmark
   */
  createBookmark(bookmark: Bookmark): Promise<Bookmark>;

  /**
   * Delete bookmark document with the BookmarkModel
   * @param {string} bid bookmark id
   * @returns {string}delete status
   */
  unbookmark(bid: string): Promise<any>;

  /**
   * Find all the bookmark tuit by the user ID
   * @param  {string} uid user id
   * @returns  {bookmark[]} bookmark
   */
  findBookmarkTuitByUserId(uid: string): Promise<Tuit[]>;

  /**
   * Delete all bookmark with user ID
   * @param {string} uid string
   * @returns {string} delete status
   */
  unbookmarkAllByUserId(uid: string): Promise<any>;

  /**
   * update bookmark by id and new bookmark
   * @param {string}bid bookmark id
   * @param {bookmark} bookmark bookmark to be updated
   * @returns update status
   */
  updateBookmark(uid: string, bookmark: Bookmark): Promise<any>;
}
