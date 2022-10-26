/**
 * @file defining message schema for mongoose
 */
import mongoose from "mongoose";

/**
 * MessageSchema
 * @constructor MessageSchema
 */

const MessageSchema = new mongoose.Schema(
  {
    message: String,
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    sentOn: { type: Date, default: Date.now },
  },
  { collection: "messages" }
);
export default MessageSchema;
