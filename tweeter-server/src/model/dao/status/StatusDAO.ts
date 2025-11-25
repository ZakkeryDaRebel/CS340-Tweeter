import { Status } from "tweeter-shared";

export interface StatusDAO {
  readBatchFeed(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]>;

  readBatchStory(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]>;

  createPost(token: string, newStatus: Status): Promise<void>;
}
