
/**
 * @file Creating mongoose model from message schema
 */
import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";

const MessageModel = mongoose.model("MessageModel", MessageSchema);

export default MessageModel;
