import {
  AuthenticationRequest,
  AuthenticationResponse,
  AuthToken,
  GetCountResponse,
  GetFollowerAndFolloweeCountResponse,
  GetUserRequest,
  GetUserResponse,
  IsFollowerRequest,
  IsFollowerResponse,
  PagedItemRequest,
  PagedItemResponse,
  PutItemRequest,
  RegisterRequest,
  Status,
  StatusDto,
  TokenedRequest,
  TweeterResponse,
  User,
  UserDto,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private SERVER_URL =
    "https://b31tf2sda3.execute-api.us-east-2.amazonaws.com/Stage";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  //
  // FOLLOW SERVICE
  //

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
    return await this.parseCount(request, "/count/:user/followees");
  }

  // Endpoint 5
  public async getFollowerCount(
    request: PutItemRequest<UserDto>
  ): Promise<number> {
    return await this.parseCount(request, "/count/:user/followers");
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
  // STATUS SERVICE
  //

  // Endpoint 8
  public async loadMoreFeedItems(
    request: PagedItemRequest<StatusDto>
  ): Promise<[Status[], boolean]> {
    return await this.pagedStatus(request, "/load/:user/feed");
  }

  // Endpoint 9
  public async loadMoreStoryItems(
    request: PagedItemRequest<StatusDto>
  ): Promise<[Status[], boolean]> {
    return await this.pagedStatus(request, "/load/:user/story");
  }

  // Endpoint 10
  public async postStatus(request: PutItemRequest<StatusDto>): Promise<void> {
    const response = await this.clientCommunicator.doPost<
      PutItemRequest<StatusDto>,
      TweeterResponse
    >(request, "/post/:user/status");

    this.handleException(response);
  }

  //
  // USER SERVICE
  //

  // Endpoint 11
  public async getUser(request: GetUserRequest): Promise<User | null> {
    const response = await this.clientCommunicator.doPost<
      GetUserRequest,
      GetUserResponse
    >(request, "/get/:user");

    this.handleException(response);
    return response.user === null ? null : User.fromDto(response.user);
  }

  // Endpoint 12
  public async register(request: RegisterRequest): Promise<[User, AuthToken]> {
    return this.authentication(request, "/register/:user");
  }

  // Endpoint 13
  public async login(
    request: AuthenticationRequest
  ): Promise<[User, AuthToken]> {
    return this.authentication(request, "/login/:user");
  }

  // Endpoint 14
  public async logout(request: TokenedRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<
      TokenedRequest,
      TweeterResponse
    >(request, "/logout/:user");
  }

  //
  // HELPER METHODS
  //

  // Used by PagedItemRequest<UserDto>
  private async pagedUsers(
    request: PagedItemRequest<UserDto>,
    path: string
  ): Promise<[User[], boolean]> {
    return this.pagedItems<UserDto, User>(
      request,
      path,
      (response: PagedItemResponse<UserDto>): User[] | null => {
        // Convert the UserDto array returned by ClientCommunicator to a User array
        const items: User[] | null =
          response.success && response.items
            ? response.items.map((dto) => User.fromDto(dto) as User)
            : null;
        return items;
      }
    );
  }

  // Used by PagedItemRequest<StatusDto>
  private async pagedStatus(
    request: PagedItemRequest<StatusDto>,
    path: string
  ): Promise<[Status[], boolean]> {
    return this.pagedItems<StatusDto, Status>(
      request,
      path,
      (response: PagedItemResponse<StatusDto>): Status[] | null => {
        // Convert the StatusDto array returned by ClientCommunicator to a Status array
        const items: Status[] | null =
          response.success && response.items
            ? response.items.map((dto) => Status.fromDto(dto) as Status)
            : null;
        return items;
      }
    );
  }

  // Used by PagedItemRequest
  private async pagedItems<T, R>(
    request: PagedItemRequest<T>,
    path: string,
    operation: (pagedResponse: PagedItemResponse<T>) => R[] | null
  ): Promise<[R[], boolean]> {
    // Convert the UserDto array returned by ClientCommunicator to a User array
    const response = await this.clientCommunicator.doPost<
      PagedItemRequest<T>,
      PagedItemResponse<T>
    >(request, path);

    const items: R[] | null = operation(response);

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

  // Used by AuthenticationRequest
  private async authentication(
    request: AuthenticationRequest,
    path: string
  ): Promise<[User, AuthToken]> {
    const response = await this.clientCommunicator.doPost<
      AuthenticationRequest,
      AuthenticationResponse
    >(request, path);

    this.handleException(response);
    return [
      User.fromDto(response.user)!,
      new AuthToken(response.token, Date.now()),
    ];
  }

  // If the response is not a success, then throw an error
  private handleException(response: TweeterResponse) {
    if (!response.success) {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }
}
