import { User, FakeData, UserDto } from "tweeter-shared";
import { Service } from "./Service";
import { DAOFactory } from "../daofactory/DAOFactory";
import { FollowDAO } from "../dao/FollowDAO";

export class FollowService implements Service {
  private followDAO: FollowDAO;

  public constructor(daoFactory: DAOFactory) {
    this.followDAO = daoFactory.getFollowDAO();
  }

  // TODO: Have non-DTO & DTO translation happen in the handler

  // Helper Methods
  private async getFakeData(
    lastItem: User | null,
    pageSize: number,
    userAlias: string
  ): Promise<[User[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      User.fromDto(lastItem),
      pageSize,
      userAlias
    );
    const dtos = items.map((user: User) => user.dto);
    return [dtos, hasMore];
  }

  private async getCounts(
    token: string,
    userToFollow: User
  ): Promise<[number, number]> {
    const followerCount = await this.getFollowerCount(token, userToFollow);
    const followeeCount = await this.getFolloweeCount(token, userToFollow);
    return [followerCount, followeeCount];
  }

  // Endpoint 1
  public async loadMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    // Look into database and grab pageSize amount of followees from db

    //authenticate token
    this.followDAO.getFollowees(userAlias, pageSize, lastItem);

    // TODO: Replace with the result of calling server
    const followService = new FollowService();
    const fn = followService.getFakeData.bind(followService);
    return fn(lastItem, pageSize, userAlias);
  }

  // Endpoint 2
  public async loadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    //Look into database and grab pageSize amount of followers from db

    // TODO: Replace with the result of calling server
    const followService = new FollowService();
    const fn = followService.getFakeData.bind(followService);
    return fn(lastItem, pageSize, userAlias);
  }

  // Endpoint 3
  public async getIsFollowerStatus(
    token: string,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    //Look into database and see if followee is in follower table

    // TODO: Replace with the result of calling server
    return FakeData.instance.isFollower();
  }

  // Endpoint 4
  public async getFolloweeCount(token: string, user: User): Promise<number> {
    //Look into database and see how many people are following the user

    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweeCount(user.alias);
  }

  // Endpoint 5
  public async getFollowerCount(token: string, user: User): Promise<number> {
    //Look into database and see how many people the user is following

    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowerCount(user.alias);
  }

  // Endpoint 6
  public async follow(
    token: string,
    userToFollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    //Add user to the user's table

    // TODO: Call the server

    const followService = new FollowService();
    const fn = followService.getCounts.bind(followService);
    return await fn(token, userToFollow);
  }

  // Endpoint 7
  public async unfollow(
    token: string,
    userToUnfollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followService = new FollowService();
    const fn = followService.getCounts.bind(followService);
    return await fn(token, userToUnfollow);
  }
}
