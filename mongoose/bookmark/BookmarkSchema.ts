/**
 * @file defining bookmark schema for mongoose
 */
import mongoose from "mongoose";

/**
 * BookmarkSchema
 * @constructor BookmarkSchema
 */
const BookmarkSchema = new mongoose.Schema(
  {
    bookmarkedTuit: { type: mongoose.Schema.Types.ObjectId, ref: "TuitModel" },
    bookmarkedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { collection: "bookmarks" }
);
export default BookmarkSchema;
