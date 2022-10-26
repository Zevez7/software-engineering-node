/**
 * @file Creating mongoose model from user schema
 */
import mongoose from "mongoose";
import UserSchema from "./UserSchema";

/**
 * UserModel
 * @constructor UserModel
 */
const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;
