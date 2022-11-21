/**
 * @file defining dislike schema for mongoose
 */
import mongoose from "mongoose";
import DislikeSchema from "./DislikeSchema";

/**
 * Dislike
 * @constructor DislikeModel
 */

const DislikeModel = mongoose.model("DislikeModel", DislikeSchema);
export default DislikeModel;
