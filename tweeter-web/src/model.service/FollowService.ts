import {
  AuthToken,
  User,
  PagedItemRequest,
  UserDto,
  IsFollowerRequest,
  PutItemRequest,
} from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../network/ServerFacade";

export class FollowService implements Service {
  // Endpoint 1
  public async loadMoreFollowees(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    const request: PagedItemRequest<UserDto> = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem,
    };
    return await new ServerFacade().getMoreFollowees(request);
  }

  // Endpoint 2
  public async loadMoreFollowers(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    const request: PagedItemRequest<UserDto> = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem,
    };
    return await new ServerFacade().getMoreFollowers(request);
  }

  // Endpoint 3
  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    const request: IsFollowerRequest = {
      token: authToken.token,
      userOne: user.dto,
      userTwo: selectedUser.dto,
    };
    return await new ServerFacade().getIsFollower(request);
  }

  // Endpoint 4
  public async getFolloweeCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    const request: PutItemRequest<UserDto> = {
      token: authToken.token,
      item: user.dto,
    };
    return await new ServerFacade().getFolloweeCount(request);
  }

  // Endpoint 5
  public async getFollowerCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    const request: PutItemRequest<UserDto> = {
      token: authToken.token,
      item: user.dto,
    };
    return await new ServerFacade().getFollowerCount(request);
  }

  // Endpoint 6
  public async follow(
    authToken: AuthToken,
    userToFollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    const request: PutItemRequest<UserDto> = {
      token: authToken.token,
      item: userToFollow.dto,
    };
    return await new ServerFacade().follow(request);
  }

  // Endpoint 7
  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    const request: PutItemRequest<UserDto> = {
      token: authToken.token,
      item: userToUnfollow.dto,
    };
    return await new ServerFacade().unfollow(request);
  }
}
