import { Express, Request, Response } from "express";

import * as movieDao from "./movies-dao";

class MoviesController {
  findAllMovies(req: Request, res: Response) {
    movieDao.findAllMovies().then((movies) => res.send(movies));
  }

  findMovieById(req: Request, res: Response) {
    const movieId = req.params.mid;
    movieDao.findMovieById(movieId).then((movie) => res.send(movie));
  }

  deleteMovieById(req: Request, res: Response) {
    const movieId = req.params.mid;
    movieDao.deleteMovie(movieId).then((movie) => res.send(movie));
  }

  createMovie(req: Request, res: Response) {
    const newMovie = req.body;
    movieDao.createMovie(newMovie).then((movies) => res.json(movies));
  }

  constructor(app: Express) {
    app.get("/api/movies", this.findAllMovies);
    app.post("/api/movies", this.createMovie);
    app.get("/api/movies/:mid", this.findMovieById);
    app.delete("/api/movies/:mid", this.deleteMovieById);
  }
}
export default MoviesController;
