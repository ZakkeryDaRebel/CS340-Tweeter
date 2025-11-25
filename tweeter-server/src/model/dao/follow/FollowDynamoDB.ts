import { User } from "tweeter-shared";
import { FollowDAO } from "./FollowDAO";

export class FollowDynamoDB implements FollowDAO {
  getBatchFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    throw new Error("Method not implemented.");
  }
  getBatchFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    throw new Error("Method not implemented.");
  }
  getIsFollower(
    token: string,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getFolloweeCount(token: string, user: User): Promise<number> {
    throw new Error("Method not implemented.");
  }
  getFollowerCount(token: string, user: User): Promise<number> {
    throw new Error("Method not implemented.");
  }
  follow(token: string, userToFollow: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  unfollow(token: string, userToUnfollow: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
