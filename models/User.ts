import AccountType from "./AccountType";
import Location from "./Location";
import MartialStatus from "./MartialStatus";

export default class User{
  private username:string="";
  private password:string="";
  private firstName:string| null = null;
  private lastName:string | null = null;
  private email:string="";
  private profilePhoto:string |null=null;
  private headerImage:string | null=null;
  private accountType:AccountType= AccountType.Personal;
  private martialStatus:MartialStatus = MartialStatus.Single;
  private biography:string  | null = null;
  private joined: Date = new Date();
  private location: Location |null=null;

}