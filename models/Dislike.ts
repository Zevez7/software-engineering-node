/**
 * @file Declares Dislike data type representing relationship between
 * users and tuits, as in user dislike for a tuit
 */

import Tuit from "./Tuit";
import User from "./user/User";

/**
 * @typedef Like Represents dislike relationship between a user and a tuit,
 * @property {Tuit} tuit Tuit being disliked
 * @property {User} dislikedBy User disliking the tuit
 */

export default interface Like {
  tuit: Tuit;
  dislikedBy: User;
}
