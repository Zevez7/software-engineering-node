import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema(
  {
    title: String,
    release: Date,
    rating: String,
    year: Number,
    direction: String,
    cast: [String],
  },
  { collection: "movies" }
);

export default moviesSchema;
