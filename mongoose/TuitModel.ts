import mongoose from "mongoose";
import TuitSchema from "./FollowSchema";

const TuitModel = mongoose.model("TuitModel", TuitSchema);

export default TuitModel;
