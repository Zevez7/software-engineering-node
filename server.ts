/**
 * @file node server, connect database with models and routes
 */
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import TuitController from "./controllers/TuitController";
import mongoose from "mongoose";
import UserController from "./controllers/UserController";

import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import LikeController from "./controllers/LikeController";

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const address = `mongodb+srv://datnguyen:datnguyentuiter@cluster0.6eip3ug.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(address);
// mongoose.connect("mongodb://127.0.0.1:27017/tuiter");

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const likesController = LikeController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
