/**
 * @file Creating mongoose model from tuit schema
 */
import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

const TuitModel = mongoose.model("TuitModel", TuitSchema);

export default TuitModel;
