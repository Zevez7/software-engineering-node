import User from "./user/User";

export default class Bookmark {
  private message: String = "";
  private to: User;
  private from: User;
  private sentOn: Date = new Date();
}
