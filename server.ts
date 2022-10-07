import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import TuitController from "./controllers/TuitController";
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import MoviesController from "./movies/movies-controller";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/tuiter");

const movieController = new MoviesController(app);

const userController = new UserController(app, new UserDao());

const tuitController = new TuitController(app, new TuitDao());

const PORT = 4000;
app.listen(process.env.PORT || PORT);

// const dbCallback = (movies: any) => {
//   console.log("inovked when db returns data");
//   console.log(movies);
// };

// moviesDao.findAllMovies().then((movies) => {
//   console.log(movies);
// });

// function sayHello(req:Request, res:Response) {
//     res.send("Hi from FSD!!");

// }

// app.get("/hello", (req: Request, res: Response) =>
//   res.send("Welcome to Foundation of Software Engineering!")
// );

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
