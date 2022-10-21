import Follow from "../../models/Follow";
import User from "../../models/user/User";

export default interface FollowDao {
  followUser(follow: Follow): Promise<Follow>;
  unfollowUser(fid: string): Promise<any>;
  findAllFollowing(uid: string): Promise<User[]>;
  findAllFollowed(uid: string): Promise<User[]>;
  removeAllFollower(uid: string): Promise<any>;
  updateFollowing(uid: string, follow: Follow): Promise<any>;
}
