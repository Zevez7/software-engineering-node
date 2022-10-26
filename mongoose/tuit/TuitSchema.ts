/**
 * @file defining tuit schema for mongoose
 */
import mongoose from "mongoose";

/**
 * TuitSchema
 * @constructor TuitSchema
 */

const TuitSchema = new mongoose.Schema(
  {
    tuit: String,
    postedOn: { type: Date, default: Date.now },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { collection: "tuits" }
);
export default TuitSchema;
