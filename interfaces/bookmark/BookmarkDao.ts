import Bookmark from "../../models/Bookmark";
import Tuit from "../../models/Tuit";
import User from "../../models/user/User";

export default interface BookmarkDao {
  createBookmark(bookmark: Bookmark): Promise<Bookmark>;

  unbookmark(bid: string): Promise<any>;

  findBookmarkTuitByUserId(uid: string): Promise<Tuit[]>;

  unbookmarkAllByUserId(uid: string): Promise<any>;

  updateBookmark(uid: string, bookmark: Bookmark): Promise<any>;
}
