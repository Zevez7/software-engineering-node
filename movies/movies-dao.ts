import moviesModel from "./movies-model";

export const findAllMovies = () => {
  return moviesModel.find();
};

export const findMovieByTitle = (title: string) => {
  moviesModel.findOne({ title: title });
};
export const findMovieById = (mid: string) => {
  return moviesModel.findById(mid);
};

export const findMoviesByDirector = (director: string) => {
  moviesModel.find({ director: director });
};

export const createMovie = (movie: any) => {
  return moviesModel.create(movie);
};

export const deleteMovie = (mid: string) => {
  return moviesModel.deleteOne({ _id: mid });
};

export const updateMovie = (mid: string, newMovie: any) => {
  moviesModel.updateOne(
    { _id: mid },
    { $set: { title: newMovie.title, direction: newMovie.direction } }
  );
};
