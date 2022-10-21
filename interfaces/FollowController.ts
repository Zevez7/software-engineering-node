import { Request, Response } from "express";

export default interface FollowController {
  followUser(req: Request, res: Response): void;
  unfollowUser(req: Request, res: Response): void;
  findAllFollowing(req: Request, res: Response): void;
  findAllFollowed(req: Request, res: Response): void;
  removeAllFollower(req: Request, res: Response): void;
  updateFollowing(req: Request, res: Response): void;
}
