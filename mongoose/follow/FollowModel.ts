/**
 * @file Creating mongoose model from follow schema
 */
import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

/**
 * FollowSchema
 * @constructor FollowSchema
 */
const FollowModel = mongoose.model("FollowModel", FollowSchema);

export default FollowModel;
