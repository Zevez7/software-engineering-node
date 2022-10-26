/**
 * @file defining follow schema for mongoose
 */
import mongoose from "mongoose";

/**
 * FollowSchema
 * @constructor FollowSchema
 */
const FollowSchema = new mongoose.Schema(
  {
    userFollowed: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    userFollowing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { collection: "follows" }
);
export default FollowSchema;
