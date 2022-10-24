/**
 * @file bookmark dao for implementing CRUD operations
 */
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/bookmark/BookmarkModel";
import BookmarkDaoI from "../interfaces/bookmark/BookmarkDao";

/**
 * @class BookmarkDao implements BookmarkDaoI
 * @property {BookmarkDao} BookmarkDao Singleton DAO implementing bookmark CRUD operation
 *
 */
export default class BookmarkDao implements BookmarkDaoI {
  private static BookmarkDao: BookmarkDao | null = null;

  /**
   * Create singleton BookmarkDao instance
   * @returns BookmarkDao
   */
  public static getInstance = (): BookmarkDao => {
    if (BookmarkDao.BookmarkDao === null) {
      BookmarkDao.BookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.BookmarkDao;
  };

  private constructor() {}

  /**
   * Create bookmark document with the BookmarkModel
   * @param {Bookmark}bookmark json bookmark
   * @returns bookmark document
   */
  async createBookmark(bookmark: Bookmark): Promise<any> {
    return await BookmarkModel.create(bookmark);
  }
  /**
   * Delete bookmark document with the BookmarkModel
   * @param {string} bid bookmark id
   * @returns delete status
   */
  async unbookmark(bid: string): Promise<any> {
    return await BookmarkModel.deleteOne({ _id: bid });
  }

  /**
   * Find all the bookmark tuit by the user ID
   * @param  {string} uid user id
   * @returns  {bookmark[]} bookmark
   */
  async findBookmarkTuitByUserId(uid: string): Promise<any[]> {
    return await BookmarkModel.find({ bookmarkedBy: uid })
      .populate("bookmarkedTuit")
      .exec();
  }

  /**
   * Delete all bookmark with user ID
   * @param {string} uid string
   * @returns {string} delete status
   */
  async unbookmarkAllByUserId(uid: string): Promise<any> {
    return await BookmarkModel.deleteMany({ bookmarkedBy: uid });
  }

  /**
   * update bookmark by bid with new bookmark
   * @param {string}bid bookmark id
   * @param {bookmark} bookmark bookmark to be updated
   * @returns update status
   */
  async updateBookmark(bid: string, bookmark: any): Promise<any> {
    return await BookmarkModel.updateOne({ _id: bid }, { $set: bookmark });
  }
}
