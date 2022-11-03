/**
 * @file node server, connect database with models and routes
 */
import express from "express";
import mongoose from "mongoose";

import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import LikeController from "./controllers/LikeController";
import { hostname } from "os";

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const address = `mongodb+srv://datnguyen:datnguyentuiter@cluster0.6eip3ug.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(address);

// mongoose.connect("mongodb://127.0.0.1:27017/tuiter");

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const likesController = LikeController.getInstance(app);

const hostname: any = "0.0.0.0";
const PORT: any = process.env.PORT || 5000;
app.listen(PORT, hostname, function () {
  console.log("Server started.......");
});
