import {
  GetCountResponse,
  GetFollowerAndFolloweeCountResponse,
  IsFollowerRequest,
  IsFollowerResponse,
  PagedItemRequest,
  PagedItemResponse,
  PutItemRequest,
  TweeterResponse,
  User,
  UserDto,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private SERVER_URL =
    "https://b31tf2sda3.execute-api.us-east-2.amazonaws.com/Stage";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  // FOLLOW SERVICE

  // Endpoint 1
  public async getMoreFollowees(
    request: PagedItemRequest<UserDto>
  ): Promise<[User[], boolean]> {
    return this.pagedUsers(request, "/load/:user/followees");
  }

  // Endpoint 2
  public async getMoreFollowers(
    request: PagedItemRequest<UserDto>
  ): Promise<[User[], boolean]> {
    return this.pagedUsers(request, "/load/:user/followers");
  }

  // Endpoint 3
  public async getIsFollower(request: IsFollowerRequest): Promise<boolean> {
    const response = await this.clientCommunicator.doPost<
      IsFollowerRequest,
      IsFollowerResponse
    >(request, "/:user1/isfollowing/:user2");

    this.handleException(response);
    return response.isFollower;
  }

  // Endpoint 4
  public async getFolloweeCount(
    request: PutItemRequest<UserDto>
  ): Promise<number> {
    return this.parseCount(request, "/count/:user/followees");
  }

  // Endpoint 5
  public async getFollowerCount(
    request: PutItemRequest<UserDto>
  ): Promise<number> {
    return this.parseCount(request, "/count/:user/followers");
  }

  // Endpoint 6
  public async follow(
    request: PutItemRequest<UserDto>
  ): Promise<[number, number]> {
    return await this.parseDoubleCount(request, "/:user1/follow/:user2");
  }

  // Endpoint 7
  public async unfollow(
    request: PutItemRequest<UserDto>
  ): Promise<[number, number]> {
    return await this.parseDoubleCount(request, "/:user1/unfollow/:user2");
  }

  //
  // HELPER METHODS
  //

  // Used by PagedItemResponse<UserDto>
  private async pagedUsers(
    request: PagedItemRequest<UserDto>,
    path: string
  ): Promise<[User[], boolean]> {
    // Convert the UserDto array returned by ClientCommunicator to a User array
    const response = await this.clientCommunicator.doPost<
      PagedItemRequest<UserDto>,
      PagedItemResponse<UserDto>
    >(request, "/load/:user/followers");

    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    // Handle errors
    this.handleException(response);
    if (items == null) {
      throw new Error(`No followees found`);
    } else {
      return [items, response.hasMore];
    }
  }

  // Used by PutItemRequest<UserDto> and only gets 1 number back
  private async parseCount(
    request: PutItemRequest<UserDto>,
    path: string
  ): Promise<number> {
    const response = await this.clientCommunicator.doPost<
      PutItemRequest<UserDto>,
      GetCountResponse
    >(request, path);

    this.handleException(response);
    return response.count;
  }

  // Used by PutItemRequest<UserDto> and gets 2 numbers back
  private async parseDoubleCount(
    request: PutItemRequest<UserDto>,
    path: string
  ): Promise<[number, number]> {
    const response = await this.clientCommunicator.doPost<
      PutItemRequest<UserDto>,
      GetFollowerAndFolloweeCountResponse
    >(request, path);

    this.handleException(response);
    return [response.followerCount, response.followeeCount];
  }

  // If the response is not a success, then throw an error
  private handleException(response: TweeterResponse) {
    if (!response.success) {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }
}
