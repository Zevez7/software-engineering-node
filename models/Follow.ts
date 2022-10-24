/**
 * @file Declare relation between two users in a follow class
 */
import User from "./user/User";

/**
 * @class Follow Represents follow relationship between a user and another user
 * @property {User} userFollowed User being followed being liked
 * @property {User} userFollowing User following
 */
export default class Follow {
  private userFollowed: User;
  private userFollowing: User;
}
