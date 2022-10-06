import User from "./User";

/**
 * source code for the classes tuit
 */
export default class Tuit {
  private tuit: String = "";
  private postedOn: Date = new Date();
  private postedBy: User | null = null;
}
