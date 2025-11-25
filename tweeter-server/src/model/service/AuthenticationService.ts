import { Service } from "./Service";

export class AuthenticationService implements Service {
  public async authenticate(token: string) {
    //Check DAO if authorized
    //If not, throw an error
  }
}
