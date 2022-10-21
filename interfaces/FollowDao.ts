import Follow from "../models/Follow";
import User from "../models/User";

export default interface FollowDao {
  // findAllUsers(): Promise<User[]>;
  // findUserById(uid: string): Promise<any>;
  // createUser(user: User): Promise<User>;
  // updateUser(uid: string, user: User): Promise<any>;

  followUser(follow: Follow): Promise<Follow>;
  unfollowUser(fid: string): Promise<any>;
  findAllFollowing(uid: string): Promise<User[]>;
  findAllFollowed(uid: string): Promise<User[]>;
  removeAllFollower(uid: string): Promise<any>;
  updateFollowing(uid: string, follow: Follow): Promise<any>;
}
