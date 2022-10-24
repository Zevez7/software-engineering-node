/**
 * @file declaring bookmark model class with relation between user and tuit
 */
import User from "./user/User";
import Tuit from "./Tuit";

/**
 * @class bookmark class
 * @property {Tuit} bookmarkedTuit tuit that's bookmark
 * @property {User} bookmarkedBy user that's bookmarking
 */
export default class Bookmark {
  private bookmarkedTuit: Tuit;
  private bookmarkedBy: User;
}
