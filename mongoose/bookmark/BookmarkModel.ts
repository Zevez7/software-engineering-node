/**
 * @file Creating mongoose model from bookmark schema
 */
import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";

/**
 * BookmarkModel
 * @constructor BookmarkModel
 */

const BookmarkModel = mongoose.model("BookmarkModel", BookmarkSchema);

export default BookmarkModel;
