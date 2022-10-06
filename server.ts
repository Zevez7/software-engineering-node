/**
 * @file Implements an Express Node HTTP server.
 */
import express, { Request, Response } from "express";
import * as mongoose from "mongoose";
// import * as moviesDao from "./movies/movies-dao";
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/tuits");

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
const PORT = 4000;
app.listen(process.env.PORT || PORT);
