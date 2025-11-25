import { User } from "tweeter-shared";

export interface FollowDAO {
  getBatchFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]>;

  getBatchFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]>;

  getIsFollower(
    token: string,
    user: User,
    selectedUser: User
  ): Promise<boolean>;

  getFolloweeCount(token: string, user: User): Promise<number>;

  getFollowerCount(token: string, user: User): Promise<number>;

  follow(token: string, userToFollow: User): Promise<void>;

  unfollow(token: string, userToUnfollow: User): Promise<void>;
}
