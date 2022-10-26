/**
 * @file defining like schema for mongoose
 */
import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";

/**
 * LikeModel
 * @constructor LikeModel
 */

const LikeModel = mongoose.model("LikeModel", LikeSchema);
export default LikeModel;
