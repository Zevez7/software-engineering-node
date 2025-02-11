import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    profile: String,
    headerImage: String,
    accountType: {
      type: String,
      default: "PERSONAL",
      enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"],
    },
    martialStatus: {
      type: String,
      default: "SINGLE",
      enum: ["MARRIED", "SINGLE", "WIDOWED"],
    },
    biography: String,
    dataOfBirth: Date,
    joined: { type: Date, default: Date.now },
    location: {
      latitude: { type: Number, default: 0.0 },
      longitude: { type: Number, default: 0.0 },
    },
  },
  { collection: "users" }
);

export default UserSchema;
