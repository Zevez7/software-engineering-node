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
import AuthenticationController from "./controllers/auth-controller";
import * as dotenv from "dotenv";

dotenv.config();
/**
 * use cors to prevent cross-origin error
 * @param  {string} "cors"
 */
const cors = require("cors");

/**
 * Add session to the express
 */
const session = require("express-session");
/**
 * set express() to app constat
 */
const app = express();

/**
 * Express calls cors()
 * @param  {cors} cors
 */
app.use(
  cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

/**
 * tell express to accept json request
 * @param  {} express.json accept json request
 */
app.use(express.json());

let sess = {
  // secret: process.env.SECRET,
  secret: "REDCAT",
  cookie: {
    secure: false,
  },
};

app.use(session(sess));
const address = `mongodb+srv://datnguyen:datnguyentuiter@cluster0.6eip3ug.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(address);
// mongoose.connect("mongodb://127.0.0.1:27017/tuiter");

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const likesController = LikeController.getInstance(app);
const authorController = AuthenticationController(app);

const PORT: any = process.env.PORT || 5000;

if (process.env.ENV === "PRODUCTION") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

/**
 * Express listen to PORT or 5000 for request
 * @param  {PORT} PORT local port ro 5000
 * @param  {string} "0.0.0.0" setting home port to 0.0.0.0
 * @param  {function} function() console.log "start server"
 */
app.listen(PORT, "0.0.0.0", function () {
  console.log("Server started.......");
});

// app.listen(5000);
