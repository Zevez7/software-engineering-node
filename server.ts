import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import TuitController from "./controllers/TuitController";
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import MoviesController from "./movies/movies-controller";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/FollowDao";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/tuiter");

// const movieController = new MoviesController(app);

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
