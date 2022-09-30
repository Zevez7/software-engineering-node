import User from "./User";

export default class Tuit {
  private tuit: String = "";
  private postedOn: Date = new Date();
  private postedBy: User | null = null;
}
