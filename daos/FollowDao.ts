import Follow from "../models/Follow";
import FollowModel from "../mongoose/follow/FollowModel";
import FollowDaoI from "../interfaces/follow/FollowDao";

export default class FollowDao implements FollowDaoI {
  private static FollowDao: FollowDao | null = null;
  public static getInstance = (): FollowDao => {
    if (FollowDao.FollowDao === null) {
      FollowDao.FollowDao = new FollowDao();
    }
    return FollowDao.FollowDao;
  };

  private constructor() {}

  async followUser(follow: Follow): Promise<any> {
    return await FollowModel.create(follow);
  }

  async unfollowUser(fid: string): Promise<any> {
    return await FollowModel.deleteOne({ _id: fid });
  }

  async findAllFollowing(uid: string): Promise<any[]> {
    return await FollowModel.find({ userFollowing: uid });
  }

  async findAllFollowed(uid: string): Promise<any[]> {
    return await FollowModel.find({ userFollowed: uid });
  }

  async removeAllFollower(uid: string): Promise<any> {
    return await FollowModel.deleteMany({ userFollowed: uid });
  }

  async updateFollowing(fid: string, follow: any): Promise<any> {
    return await FollowModel.updateOne({ _id: fid }, { $set: follow });
  }
}
