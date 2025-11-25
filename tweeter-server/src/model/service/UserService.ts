import { FakeData, User, UserDto } from "tweeter-shared";
import { Service } from "./Service";

export class UserService implements Service {
  public constructor() {}

  // TODO: Have non-DTO & DTO translation happen in the handler

  // Helper Method
  private async fakeDataAuthentication(): Promise<[User, string]> {
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user.dto, FakeData.instance.authToken.token];
  }

  // Endpoint 11
  public async getUser(token: string, alias: string): Promise<User | null> {
    // TODO: Replace with the result of calling server
    let user = FakeData.instance.findUserByAlias(alias);
    return user;
  }

  // Endpoint 12
  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageStringBase64: string,
    imageFileExtension: string
  ): Promise<[User, string]> {
    // TODO: Replace with the result of calling the server
    const followService = new UserService();
    const fn = followService.fakeDataAuthentication.bind(followService);
    return fn();
  }

  // Endpoint 13
  public async login(alias: string, password: string): Promise<[User, string]> {
    // TODO: Replace with the result of calling the server
    const followService = new UserService();
    const fn = followService.fakeDataAuthentication.bind(followService);
    return fn();
  }

  // Endpoint 14
  public async logout(token: string): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  }
}
