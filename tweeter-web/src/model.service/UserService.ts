import { Buffer } from "buffer";
import {
  AuthToken,
  User,
  GetUserRequest,
  RegisterRequest,
  AuthenticationRequest,
  TokenedRequest,
} from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../network/ServerFacade";

export class UserService implements Service {
  // Endpoint 11
  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    const request: GetUserRequest = {
      token: authToken.token,
      user: alias,
    };
    return await new ServerFacade().getUser(request);
  }

  // Endpoint 12
  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[User, AuthToken]> {
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    const request: RegisterRequest = {
      firstName: firstName,
      lastName: lastName,
      alias: alias,
      password: password,
      imageStringBase64: imageStringBase64,
      imageFileExtension: imageFileExtension,
    };
    let [user, auth] = await new ServerFacade().register(request);
    console.log("User: " + user.toJson());
    return [user, auth];
  }

  // Endpoint 13
  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    const request: AuthenticationRequest = {
      alias: alias,
      password: password,
    };
    return await new ServerFacade().login(request);
  }

  // Endpoint 14
  public async logout(authToken: AuthToken): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));

    const request: TokenedRequest = {
      token: authToken.token,
    };
    new ServerFacade().logout(request);
  }
}
