import { FakeData, UserDto } from "tweeter-shared";
import { Service } from "./Service";

export class UserService implements Service {
  // Helper Method
  private async fakeDataAuthentication(): Promise<[UserDto, string]> {
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user, FakeData.instance.authToken.token];
  }

  // Endpoint 11
  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    // TODO: Replace with the result of calling server
    let user = FakeData.instance.findUserByAlias(alias);
    return user == null ? null : user.dto;
  }

  // Endpoint 12
  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageStringBase64: string,
    imageFileExtension: string
  ): Promise<[UserDto, string]> {
    // TODO: Replace with the result of calling the server
    const followService = new UserService();
    const fn = followService.fakeDataAuthentication.bind(followService);
    return fn();
  }

  // Endpoint 13
  public async login(
    alias: string,
    password: string
  ): Promise<[UserDto, string]> {
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
